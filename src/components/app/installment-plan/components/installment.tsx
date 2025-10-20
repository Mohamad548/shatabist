'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Helper function to read a cookie by name
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

export enum CreditScoringStep {
  USER_INFO,
  OTP_VERIFICATION,
  POLLING_STATUS,
  SUCCESS,
  ERROR,
}

export interface AccessTokenResponse {
  Result: {
    AccessToken: string;
    RefreshToken: string;
    ApiKey: string;
  };
  HasError: boolean;
}

export interface SubmitRequestResponse {
  Result: {
    Data: string; // This is the HashCode
    HasError: boolean;
  };
}

export interface ValidateOtpResponse {
  Result: {
    Data: 'InProcessing' | null;
    HasError: boolean;
    Messages: { Reason: string; Message: string }[];
  };
}

export enum ReportStatus {
  ENTRY = 'Entry',
  OTP_SENT = 'OTPSent',
  OTP_ACCEPTED = 'OTPAccessed',
  REPORT_GENERATED = 'ReportGenerated',
  REPORT_FAILED = 'ReportGenerationFailed',
  REPORT_DATA_LOST = 'ReportGeneratedButDataLost',
  REQUEST_EXPIRED = 'RequestExpired',
}

export interface StatusCheckResponse {
  Result: {
    Data: {
      Status: ReportStatus;
      ReportLink: string | null;
    } | null;
    HasError: boolean;
    Messages: { Reason: string; Message: string }[];
  };
}

export interface PdfReportResponse {
  // Axios will return blob
  data: Blob;
}

// Main Wizard Component
export default function InstallmentTast() {
  const [step, setStep] = useState<CreditScoringStep>(
    CreditScoringStep.USER_INFO
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [mobile, setMobile] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [otp, setOtp] = useState('');

  // Data flowing through steps
  const [hashCode, setHashCode] = useState<string | null>(null);
  const [reportLink, setReportLink] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- API Handlers ---

  const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getCookie('token');
      // توجه: لطفاً 'YOUR_API_KEY_HERE' را با کلید API واقعی خود جایگزین کنید.
      // این کلید برای ارتباط با سرویس اعتبارسنجی ضروری است.
      const apiKey = 'YOUR_API_KEY_HERE';

      if (!token) {
        setError('توکن احراز هویت یافت نشد. لطفا مجدداً وارد شوید.');
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      params.append('RealPersonNationalCode', nationalId);
      params.append('MobileNumber', mobile);

      const response = await axios.post(
        'https://app.ics24.ir/b2b/api/request',
        params,
        {
          headers: {
            'x-apikey': apiKey,
            Authorization: `Bearer ${token}`,
            'x-version': '2.0',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (
        response.data &&
        !response.data.HasError &&
        response.data?.Result?.Data
      ) {
        setHashCode(response.data.Result.Data);
        setStep(CreditScoringStep.OTP_VERIFICATION);
      } else {
        const errorMessage =
          response.data?.Result?.Messages?.[0]?.Message ||
          'خطا در ارسال اطلاعات.';
        setError(errorMessage);
      }
    } catch (err) {
      setError('خطایی در ارتباط با سرور رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getCookie('token');
      // توجه: لطفاً 'YOUR_API_KEY_HERE' را با کلید API واقعی خود جایگزین کنید.
      const apiKey = 'YOUR_API_KEY_HERE';

      if (!token || !hashCode) {
        setError(
          'اطلاعات مورد نیاز برای تایید OTP ناقص است (توکن یا کد درخواست یافت نشد).'
        );
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      params.append('HashCode', hashCode);
      params.append('OTP', otp);

      const response = await axios.post(
        'https://app.ics24.ir/b2b/api/otp/validate',
        params,
        {
          headers: {
            'x-apikey': apiKey,
            Authorization: `Bearer ${token}`,
            'x-version': '2.0',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data && !response.data.HasError) {
        setStep(CreditScoringStep.POLLING_STATUS);
      } else {
        const errorMessage =
          response.data?.Result?.Messages?.[0]?.Message ||
          'کد وارد شده صحیح نمی باشد.';
        setError(errorMessage);
      }
    } catch (err) {
      setError('خطایی در ارتباط با سرور رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const token = getCookie('token');
      // توجه: لطفاً 'YOUR_API_KEY_HERE' را با کلید API واقعی خود جایگزین کنید.
      const apiKey = 'YOUR_API_KEY_HERE';

      if (!token || !hashCode) {
        setError(
          'اطلاعات مورد نیاز برای استعلام وضعیت ناقص است (توکن یا کد درخواست یافت نشد).'
        );
        setStep(CreditScoringStep.ERROR);
        return;
      }

      const response = await axios.get(
        `https://app.ics24.ir/b2b/api/status?HashCode=${hashCode}`,
        {
          headers: {
            'x-apikey': apiKey,
            Authorization: `Bearer ${token}`,
            'x-version': '2.0',
          },
        }
      );

      const statusData = response.data?.Result?.Data;
      if (statusData) {
        switch (statusData.Status) {
          case ReportStatus.REPORT_GENERATED:
            setReportLink(statusData.ReportLink);
            setStep(CreditScoringStep.SUCCESS);
            break;
          case ReportStatus.REPORT_FAILED:
          case ReportStatus.REPORT_DATA_LOST:
          case ReportStatus.REQUEST_EXPIRED:
            setError(
              `وضعیت گزارش: ${statusData.Status}. لطفا دوباره تلاش کنید.`
            );
            setStep(CreditScoringStep.ERROR);
            break;
          // For other statuses (ENTRY, OTP_SENT, OTP_ACCEPTED), we keep polling.
        }
      } else if (response.data?.HasError) {
        const errorMessage =
          response.data?.Result?.Messages?.[0]?.Message ||
          'خطا در بررسی وضعیت گزارش.';
        setError(errorMessage);
        setStep(CreditScoringStep.ERROR);
      }
    } catch (err) {
      setError('خطایی در ارتباط با سرور هنگام بررسی وضعیت رخ داد.');
      setStep(CreditScoringStep.ERROR);
    }
  };

  useEffect(() => {
    if (step === CreditScoringStep.POLLING_STATUS) {
      // Start polling immediately, then set an interval
      checkStatus();
      pollingIntervalRef.current = setInterval(checkStatus, 5000); // Poll every 5 seconds
    }

    // Cleanup interval on step change or unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [step]);

  // --- Render Logic ---

  const renderContent = () => {
    switch (step) {
      case CreditScoringStep.USER_INFO:
        return (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">اعتبارسنجی</h1>
              <p className="mt-2 text-gray-600">
                برای شروع، لطفاً اطلاعات زیر را وارد نمایید.
              </p>
            </div>
            <FormWrapper error={error}>
              <form onSubmit={handleUserInfoSubmit} className="space-y-6">
                <InputField
                  id="nationalId"
                  label="کد ملی"
                  type="text"
                  value={nationalId}
                  onChange={setNationalId}
                  placeholder="کد ملی ۱۰ رقمی"
                  pattern="\d{10}"
                  required
                />
                <InputField
                  id="mobile"
                  label="شماره موبایل"
                  type="tel"
                  value={mobile}
                  onChange={setMobile}
                  placeholder="مثال: 09123456789"
                  pattern="^09\d{9}$"
                  required
                />
                <SubmitButton
                  loading={loading}
                  text="ارسال و دریافت کد تایید"
                />
              </form>
            </FormWrapper>
          </>
        );

      case CreditScoringStep.OTP_VERIFICATION:
        return (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                تایید شماره موبایل
              </h1>
              <p className="mt-2 text-gray-600">
                کد تایید ارسال شده به شماره {mobile} را وارد کنید.
              </p>
            </div>
            <FormWrapper error={error}>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <InputField
                  id="otp"
                  label="کد تایید"
                  type="text"
                  value={otp}
                  onChange={setOtp}
                  placeholder="کد ۶ رقمی"
                  pattern="\d{6}"
                  required
                />
                <SubmitButton loading={loading} text="تایید و ادامه" />
              </form>
            </FormWrapper>
          </>
        );

      case CreditScoringStep.POLLING_STATUS:
        return (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              در حال دریافت گزارش
            </h1>
            <p className="text-gray-600">
              لطفا چند لحظه صبر کنید. این فرآیند ممکن است کمی طول بکشد...
            </p>
            <div className="flex justify-center items-center pt-4">
              <svg
                className="animate-spin h-10 w-10 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        );

      case CreditScoringStep.SUCCESS:
        return (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-green-600">
              گزارش با موفقیت دریافت شد
            </h1>
            <p className="text-gray-700">
              می‌توانید گزارش اعتبار خود را از طریق لینک زیر مشاهده و دانلود
              نمایید.
            </p>
            <a
              ref={reportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-3 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
            >
              مشاهده گزارش
            </a>
          </div>
        );

      case CreditScoringStep.ERROR:
        return (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-600">
              عملیات ناموفق بود
            </h1>
            <p className="text-gray-700 bg-red-100 p-3 rounded-md">
              {error || 'یک خطای ناشناخته رخ داده است.'}
            </p>
            <button
              onClick={() => {
                setStep(CreditScoringStep.USER_INFO);
                setError(null);
              }}
              className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              تلاش مجدد
            </button>
          </div>
        );

      default:
        return <div>مرحله نامعتبر است.</div>;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 transition-all">
        {renderContent()}
      </div>
    </main>
  );
}

// --- Reusable UI Components ---

const FormWrapper: React.FC<{
  error: string | null;
  children: React.ReactNode;
}> = ({ error, children }) => (
  <div>
    {error && (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 text-right"
        role="alert"
      >
        <span className="font-medium">خطا!</span> {error}
      </div>
    )}
    {children}
  </div>
);

const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  pattern: string;
  required?: boolean;
}> = ({ id, label, type, value, onChange, placeholder, pattern, required }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 text-right mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right transition-shadow"
      placeholder={placeholder}
      required={required}
      pattern={pattern}
      title={`لطفا فرمت صحیح را وارد کنید: ${placeholder}`}
      autoComplete="off"
    />
  </div>
);

const SubmitButton: React.FC<{ loading: boolean; text: string }> = ({
  loading,
  text,
}) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
  >
    {loading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>در حال ارسال...</span>
      </>
    ) : (
      text
    )}
  </button>
);