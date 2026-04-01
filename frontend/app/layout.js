import './globals.css';
import PublicWidgets from '../components/PublicWidgets';

export const metadata = {
  title: 'Trung Tâm Tiếng Trung Hiện Đại | Học Tiếng Trung Đà Nẵng',
  description: 'Trung tâm tiếng Trung uy tín tại Đà Nẵng. Luyện thi HSK 1-6, tiếng Trung thương mại, thiếu nhi. Giáo viên giàu kinh nghiệm, lớp sĩ số nhỏ, cam kết đầu ra.',
  keywords: 'học tiếng Trung Đà Nẵng, luyện thi HSK, trung tâm tiếng Trung, tiếng Trung thương mại',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <PublicWidgets />
      </body>
    </html>
  );
}
