function seedDB(db) {
  // Courses
  const insertCourse = db.prepare(`
    INSERT INTO courses (slug, title, subtitle, description, content, level, duration, sessions, fee, image, badge, is_featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const courses = [
    ['hsk-1-2', 'Tiếng Trung HSK 1-2', 'Khóa học dành cho người mới bắt đầu', 'Khóa học tiếng Trung cơ bản giúp bạn làm quen với phát âm, chữ Hán và các hội thoại đơn giản trong cuộc sống hàng ngày.', 'Nội dung chi tiết khóa HSK 1-2...', 'Cơ bản (A1-A2)', '3 tháng', '36 buổi (3 buổi/tuần)', '2.500.000 VNĐ', 'https://picsum.photos/seed/hsk12/800/450', 'Phổ biến nhất', 1, 1],
    ['hsk-3', 'Tiếng Trung HSK 3', 'Trung cấp sơ - Giao tiếp cơ bản', 'Nâng cao kỹ năng tiếng Trung với vốn từ vựng 600 từ, đọc hiểu và viết văn bản đơn giản, giao tiếp trong môi trường làm việc.', 'Nội dung chi tiết khóa HSK 3...', 'Trung cấp sơ (B1)', '4 tháng', '48 buổi (3 buổi/tuần)', '3.200.000 VNĐ', 'https://picsum.photos/seed/hsk3/800/450', null, 1, 2],
    ['hsk-4', 'Tiếng Trung HSK 4', 'Trung cấp - Làm việc chuyên nghiệp', 'Thành thạo 1200 từ vựng, đọc hiểu báo chí đơn giản, viết email công việc và giao tiếp lưu loát với người bản ngữ.', 'Nội dung chi tiết khóa HSK 4...', 'Trung cấp (B2)', '5 tháng', '60 buổi (3 buổi/tuần)', '3.800.000 VNĐ', 'https://picsum.photos/seed/hsk4/800/450', 'Được chọn nhiều', 1, 3],
    ['hsk-5', 'Tiếng Trung HSK 5', 'Cao cấp sơ - Làm việc với người Trung', 'Nắm vững 2500 từ vựng, đọc hiểu văn bản phức tạp, viết luận, trình bày ý kiến và làm việc trực tiếp với đối tác Trung Quốc.', 'Nội dung chi tiết khóa HSK 5...', 'Cao cấp sơ (C1)', '6 tháng', '72 buổi (3 buổi/tuần)', '4.500.000 VNĐ', 'https://picsum.photos/seed/hsk5/800/450', null, 0, 4],
    ['hsk-6', 'Tiếng Trung HSK 6', 'Cao cấp - Chuyên gia tiếng Trung', 'Đạt trình độ chuyên gia với 5000+ từ vựng, đọc hiểu văn học, viết văn bản học thuật và giao tiếp như người bản ngữ.', 'Nội dung chi tiết khóa HSK 6...', 'Cao cấp (C2)', '8 tháng', '96 buổi (3 buổi/tuần)', '5.500.000 VNĐ', 'https://picsum.photos/seed/hsk6/800/450', 'Cao cấp', 0, 5],
    ['thuong-mai', 'Tiếng Trung Thương Mại', 'Dành cho người đi làm, kinh doanh', 'Chương trình chuyên biệt cho môi trường kinh doanh: đàm phán, hợp đồng, thuyết trình, giao tiếp email và họp chuyên nghiệp bằng tiếng Trung.', 'Nội dung chi tiết khóa Thương Mại...', 'Trung – Cao cấp', '4 tháng', '48 buổi (2 buổi/tuần)', '4.200.000 VNĐ', 'https://picsum.photos/seed/business/800/450', 'Hot', 1, 6],
    ['tre-em', 'Tiếng Trung Trẻ Em', 'Dành cho học sinh 6-15 tuổi', 'Phương pháp dạy học sinh động, kết hợp trò chơi và bài hát, giúp trẻ học tiếng Trung một cách tự nhiên và hiệu quả.', 'Nội dung chi tiết khóa Trẻ em...', 'Thiếu nhi', '3 tháng', '36 buổi (3 buổi/tuần)', '2.200.000 VNĐ', 'https://picsum.photos/seed/kids/800/450', null, 0, 7],
    ['ca-nhan-1-1', 'Lớp Học 1-1 Cá Nhân', 'Học riêng, tiến nhanh, linh hoạt 100%', 'Lịch học hoàn toàn theo yêu cầu của học viên. Giáo viên thiết kế giáo án riêng, tập trung vào điểm yếu và mục tiêu cụ thể của từng người.', 'Nội dung chi tiết khóa 1-1...', 'Mọi trình độ', 'Linh hoạt', 'Theo nhu cầu', 'Liên hệ báo giá', 'https://picsum.photos/seed/private/800/450', 'VIP', 1, 8],
  ];

  for (const c of courses) insertCourse.run(...c);

  // Articles
  const insertArticle = db.prepare(`
    INSERT INTO articles (slug, title, excerpt, content, image, category, author, views)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const articles = [
    ['meo-hoc-tieng-trung', '5 Mẹo Học Tiếng Trung Hiệu Quả Cho Người Mới Bắt Đầu', 'Bạn đang bắt đầu học tiếng Trung và không biết bắt đầu từ đâu? Đây là 5 phương pháp đã được kiểm chứng bởi hàng nghìn học viên tại trung tâm chúng tôi.', '<p>Nội dung bài viết chi tiết về mẹo học tiếng Trung...</p>', 'https://picsum.photos/seed/study/800/450', 'Mẹo học', 'Lâm Thị Hiệp', 1250],
    ['hsk-la-gi', 'HSK Là Gì? Tất Cả Những Điều Bạn Cần Biết Về Chứng Chỉ HSK', 'HSK (汉语水平考试) là chứng chỉ tiếng Trung quốc tế được công nhận toàn cầu. Bài viết này giải thích chi tiết từng cấp độ và cách chuẩn bị thi HSK hiệu quả.', '<p>Nội dung bài viết chi tiết về HSK...</p>', 'https://picsum.photos/seed/certificate/800/450', 'Kiến thức', 'Nguyễn Minh Đức', 2340],
    ['co-hoi-viec-lam', 'Cơ Hội Việc Làm Hấp Dẫn Khi Biết Tiếng Trung Năm 2024', 'Với làn sóng đầu tư từ Trung Quốc vào Việt Nam ngày càng tăng, nhu cầu tuyển dụng nhân sự biết tiếng Trung đang bùng nổ. Mức lương từ 15-40 triệu/tháng.', '<p>Nội dung bài viết chi tiết về cơ hội việc làm...</p>', 'https://picsum.photos/seed/career/800/450', 'Nghề nghiệp', 'Lý Thành Đạt', 3180],
    ['tu-vung-thong-dung', '100 Từ Vựng Tiếng Trung Thông Dụng Nhất Trong Cuộc Sống', 'Tổng hợp 100 từ vựng tiếng Trung quan trọng nhất mà bạn cần biết để giao tiếp cơ bản. Kèm phiên âm pinyin và nghĩa tiếng Việt đầy đủ.', '<p>Nội dung bài viết chi tiết về từ vựng...</p>', 'https://picsum.photos/seed/vocabulary/800/450', 'Từ vựng', 'Trần Ngọc Linh', 4560],
    ['luyen-phat-am', 'Cách Luyện Phát Âm Tiếng Trung Chuẩn - Hướng Dẫn Pinyin Toàn Tập', 'Phát âm là nền tảng quan trọng nhất khi học tiếng Trung. Bài viết này hướng dẫn chi tiết cách đọc 4 thanh điệu và toàn bộ hệ thống pinyin.', '<p>Nội dung bài viết chi tiết về phát âm...</p>', 'https://picsum.photos/seed/pronunciation/800/450', 'Kỹ năng', 'Lâm Thị Hiệp', 2890],
    ['hoc-online-offline', 'So Sánh Học Tiếng Trung Online Và Offline - Lựa Chọn Nào Phù Hợp?', 'Mỗi hình thức học đều có ưu và nhược điểm riêng. Bài viết phân tích chi tiết để bạn chọn được phương thức học phù hợp với lối sống và mục tiêu.', '<p>Nội dung bài viết chi tiết về so sánh...</p>', 'https://picsum.photos/seed/online/800/450', 'Tư vấn', 'Nguyễn Minh Đức', 1670],
  ];

  for (const a of articles) insertArticle.run(...a);

  // Teachers
  const insertTeacher = db.prepare(`
    INSERT INTO teachers (name, title, degree, specialization, university, bio, photo, years_experience, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const teachers = [
    ['Lâm Thị Hiệp', 'Trưởng Bộ Môn Tiếng Trung', 'Thạc sĩ Ngôn ngữ Trung Quốc', 'HSK 1-4, Tiếng Trung giao tiếp', 'Đại học Ngoại ngữ - ĐH Đà Nẵng', 'Cô Hiệp có hơn 10 năm kinh nghiệm giảng dạy tiếng Trung. Tốt nghiệp Thạc sĩ tại ĐH Ngoại ngữ Đà Nẵng, từng tu nghiệp tại Bắc Kinh 2 năm. Phong cách giảng dạy sinh động, dễ hiểu, được học viên yêu thích.', 'https://picsum.photos/seed/teacher1/400/400', 10, 1],
    ['Nguyễn Minh Đức', 'Giảng Viên HSK Cao Cấp', 'Tiến sĩ Ngôn ngữ học', 'HSK 5-6, Tiếng Trung học thuật', 'Đại học Bắc Kinh (Trung Quốc)', 'Thầy Đức tốt nghiệp Tiến sĩ tại ĐH Bắc Kinh, có 7 năm kinh nghiệm giảng dạy. Chuyên gia hàng đầu về luyện thi HSK cấp cao, đã giúp hàng trăm học viên đạt chứng chỉ HSK 5-6.', 'https://picsum.photos/seed/teacher2/400/400', 7, 2],
    ['Trần Ngọc Linh', 'Giảng Viên Tiếng Trung Thiếu Nhi', 'Cử nhân Sư phạm Tiếng Trung', 'Tiếng Trung trẻ em, HSK 1-2', 'Đại học Sư phạm Đà Nẵng', 'Cô Linh chuyên giảng dạy tiếng Trung cho trẻ em với phương pháp học qua trò chơi và âm nhạc. 5 năm kinh nghiệm, tỷ lệ học sinh yêu thích môn học đạt 98%.', 'https://picsum.photos/seed/teacher3/400/400', 5, 3],
    ['Lý Thành Đạt', 'Giảng Viên Tiếng Trung Thương Mại', 'Thạc sĩ Quản trị Kinh doanh', 'Tiếng Trung thương mại, HSK 4-5', 'ĐH Kinh tế Đà Nẵng + BSST Certificate', 'Thầy Đạt có 8 năm kinh nghiệm làm việc tại các công ty Trung Quốc tại Việt Nam trước khi chuyển sang giảng dạy. Hiểu sâu môi trường kinh doanh thực tế, giúp học viên áp dụng ngay vào công việc.', 'https://picsum.photos/seed/teacher4/400/400', 8, 4],
  ];

  for (const t of teachers) insertTeacher.run(...t);

  // Testimonials
  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (student_name, photo, course, rating, review, success_story)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const testimonials = [
    ['Nguyễn Thị Thu', 'https://picsum.photos/seed/student1/200/200', 'Tiếng Trung HSK 5', 5, 'Sau 1.5 năm học tại trung tâm, tôi đã đậu HSK 5 với điểm số cao. Phương pháp giảng dạy của thầy cô rất bài bản, tôi từ con số không giờ đã giao tiếp được với người Trung Quốc.', 'Đậu HSK 5, hiện làm phiên dịch tại công ty Foxconn với mức lương 25 triệu/tháng'],
    ['Trần Văn Bình', 'https://picsum.photos/seed/student2/200/200', 'Tiếng Trung Thương Mại', 5, 'Tôi học khóa Thương Mại để phục vụ công việc kinh doanh với đối tác Trung Quốc. Chỉ sau 4 tháng, tôi đã tự tin đàm phán hợp đồng bằng tiếng Trung. Rất đáng đầu tư!', 'Giám đốc kinh doanh, ký thành công hợp đồng 2 triệu USD với đối tác Thượng Hải'],
    ['Lê Thị Hương', 'https://picsum.photos/seed/student3/200/200', 'Tiếng Trung HSK 4', 5, 'Tôi đăng ký học với mục tiêu giành học bổng du học Trung Quốc. Thầy cô đã hỗ trợ tôi rất nhiều trong việc ôn luyện. Kết quả tôi đã đạt HSK 4 và giành học bổng toàn phần!', 'Giành học bổng toàn phần du học tại ĐH Phúc Đán, Thượng Hải'],
    ['Phạm Minh Tuấn', 'https://picsum.photos/seed/student4/200/200', 'Tiếng Trung HSK 4', 5, 'Lớp học sĩ số nhỏ, thầy cô chú ý đến từng học viên. Tôi học được nhiều nhất là kỹ năng nghe và phát âm – hai điểm yếu của tôi trước đây. Trung tâm rất chuyên nghiệp.', 'Hiện là phiên dịch tại KCN Hòa Khánh, thu nhập tăng gấp đôi'],
    ['Đoàn Thị Mai', 'https://picsum.photos/seed/student5/200/200', 'Tiếng Trung Trẻ Em (cho con)', 5, 'Con tôi 8 tuổi học tại đây được 6 tháng, tiến bộ vượt bậc. Cô Linh dạy rất kiên nhẫn và vui vẻ, con luôn háo hức đi học. Tôi rất yên tâm khi gửi con cho trung tâm.', 'Con đạt giải Nhì cuộc thi Tiếng Trung thiếu nhi TP Đà Nẵng'],
    ['Võ Quang Huy', 'https://picsum.photos/seed/student6/200/200', 'Lớp Học 1-1 Cá Nhân', 5, 'Tôi chọn lớp 1-1 vì lịch làm việc không ổn định. Giáo viên sắp xếp lịch linh hoạt và thiết kế bài học riêng phù hợp 100% với nhu cầu của tôi. Tiến độ học nhanh hơn lớp thường gấp đôi.', 'Đậu HSK 3 chỉ sau 4 tháng học, hiện đang học tiếp HSK 4'],
  ];

  for (const t of testimonials) insertTestimonial.run(...t);

  // Videos
  const insertVideo = db.prepare(`
    INSERT INTO videos (title, youtube_id, thumbnail, description, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  const videos = [
    ['Bài học tiếng Trung cơ bản - Chào hỏi & Giới thiệu bản thân', 'dQw4w9WgXcQ', 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', 'Học cách chào hỏi và giới thiệu bản thân bằng tiếng Trung trong 15 phút', 1],
    ['Hướng dẫn phát âm 4 thanh điệu tiếng Trung - Pinyin cơ bản', 'jNQXAC9IVRw', 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg', 'Học cách phát âm chuẩn 4 thanh điệu và hệ thống Pinyin trong tiếng Trung', 2],
    ['100 từ vựng tiếng Trung thông dụng nhất - Học trong 30 phút', 'M7lc1UVf-VE', 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg', 'Nhanh chóng học 100 từ vựng tiếng Trung phổ biến nhất trong cuộc sống hàng ngày', 3],
  ];

  for (const v of videos) insertVideo.run(...v);
}

module.exports = { seedDB };
