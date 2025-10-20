export function getContrastColor(colorStr: string) {
  let r, g, b;

  if (colorStr.startsWith('rgb')) {
    // اگر رشته از نوع rgb یا rgba بود
    const rgbValues = colorStr.match(/\d+/g);
    if (!rgbValues) return '#000000'; // اگر نتوانست مقدار بگیره، پیش‌فرض سیاه
    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);
  } else {
    // فرض می‌کنیم هگز هست
    const hex = colorStr.charAt(0) === '#' ? colorStr.substring(1) : colorStr;
    if (hex.length === 3) {
      // پشتیبانی از هگز سه رقمی مثل #fff
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      // اگر ورودی نامعتبر بود
      return '#000000';
    }
  }

  // محاسبه روشنایی
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // بر اساس روشنایی رنگ تضاد برگشت داده شود
  return brightness > 125 ? '#000000' : '#ffffff';
}
