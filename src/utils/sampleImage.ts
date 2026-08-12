/**
 * Generates a sample WebP image in the browser for testing purposes.
 */
export async function createSampleWebPFile(): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context unavailable');
  }

  // Draw vibrant sample graphic
  const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
  gradient.addColorStop(0, '#4f46e5');
  gradient.addColorStop(0.5, '#06b6d4');
  gradient.addColorStop(1, '#10b981');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 800);

  // Draw decorative geometry
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(300, 200, 250, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(950, 600, 350, 0, Math.PI * 2);
  ctx.fill();

  // Draw central text card
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  
  // Rounded rectangle for card
  const rx = 350, ry = 250, rw = 500, rh = 300, radius = 24;
  ctx.beginPath();
  ctx.moveTo(rx + radius, ry);
  ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, radius);
  ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, radius);
  ctx.arcTo(rx, ry + rh, rx, ry, radius);
  ctx.arcTo(rx, ry, rx + rw, ry, radius);
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sample WebP Image', 600, 380);

  ctx.fillStyle = '#64748b';
  ctx.font = '20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('1200 × 800 px • WebP Format', 600, 430);

  ctx.fillStyle = '#4f46e5';
  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Ready for instant browser conversion', 600, 480);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        // Fallback to png if webp encoding fails in older browser
        canvas.toBlob((fallbackBlob) => {
          if (!fallbackBlob) return reject(new Error('Sample generation failed'));
          resolve(new File([fallbackBlob], 'sample_image.png', { type: 'image/png' }));
        }, 'image/png');
        return;
      }
      resolve(new File([blob], 'sample_demo_image.webp', { type: 'image/webp' }));
    }, 'image/webp', 0.9);
  });
}
