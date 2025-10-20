'use client';

import dynamic from 'next/dynamic';

const OpenLayersMap = dynamic(() => import('@/components/base/map'), {
  ssr: false,
});

interface ContactWrapperNoSSRProps {
  initialLat?: number;
  initialLng?: number;
  popupText?: string;
}

export default function ContactWrapperNoSSR({
  initialLat = 35.7025,
  initialLng = 51.376804,
  popupText = 'شرکت شتا۲۰',
}: ContactWrapperNoSSRProps) {
  return (
    <OpenLayersMap
      className="h-96 w-full rounded-none"
      initialLat={initialLat}
      initialLng={initialLng}
      popupText={popupText}
      locked={true}
      onChange={() => {}}
      key={1}
    />
  );
}
