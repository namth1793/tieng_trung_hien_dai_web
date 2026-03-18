'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../../components/RegistrationModal';

// ── Static test data per level ───────────────────────────────────────────────

const TEST_DATA = {
  hsk2: {
    title: 'Kiểm Tra Đầu Vào HSK 2',
    subtitle: 'Đánh giá trình độ sơ cấp – khoảng 300 từ vựng',
    image: 'https://picsum.photos/seed/hsk2-test/1200/400',
    level: 'HSK 2',
    desc: 'HSK 2 đánh giá khả năng sử dụng tiếng Trung trong các tình huống đơn giản hàng ngày với khoảng 300 từ vựng.',
    questions: [
      { q: '你叫什么名字？(Bạn tên là gì?)', opts: ['我叫小明', '我是学生', '我很好', '谢谢你'], ans: 0 },
      { q: '现在几点了？(Bây giờ là mấy giờ?)', opts: ['今天星期三', '现在三点', '我吃饭', '很高兴'], ans: 1 },
      { q: '你家在哪里？(Nhà bạn ở đâu?)', opts: ['我喜欢', '北京', '明天去', '你好'], ans: 1 },
      { q: '"苹果"的意思是gì?', opts: ['Cam', 'Chuối', 'Táo', 'Nho'], ans: 2 },
      { q: '"谢谢" dùng để nói gì?', opts: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'], ans: 1 },
    ],
  },
  hsk3: {
    title: 'Kiểm Tra Đầu Vào HSK 3',
    subtitle: 'Đánh giá trình độ trung cấp sơ – khoảng 600 từ vựng',
    image: 'https://picsum.photos/seed/hsk3-test/1200/400',
    level: 'HSK 3',
    desc: 'HSK 3 đánh giá khả năng giao tiếp trong các tình huống cuộc sống và công việc cơ bản với khoảng 600 từ vựng.',
    questions: [
      { q: '"虽然…但是…" dùng để diễn đạt điều gì?', opts: ['Nguyên nhân – Kết quả', 'Nhượng bộ – Đối lập', 'Điều kiện – Kết quả', 'Tăng tiến'], ans: 1 },
      { q: '请把这个___给他。(Từ nào điền vào chỗ trống?)', opts: ['送', '带', '拿', 'cả 3 đều được'], ans: 3 },
      { q: '"差不多" có nghĩa là gì?', opts: ['Rất nhiều', 'Gần như/Khoảng', 'Không đủ', 'Hoàn toàn'], ans: 1 },
      { q: '把字句 được dùng khi nào?', opts: ['Diễn đạt cảm xúc', 'Nhấn mạnh kết quả của hành động', 'Hỏi thời gian', 'Miêu tả ngoại hình'], ans: 1 },
      { q: '"一边…一边…" có nghĩa là gì?', opts: ['Lần lượt làm', 'Vừa…vừa…(cùng lúc)', 'Hoặc…hoặc…', 'Trước…sau…'], ans: 1 },
    ],
  },
  hsk4: {
    title: 'Kiểm Tra Đầu Vào HSK 4',
    subtitle: 'Đánh giá trình độ trung cấp – khoảng 1.200 từ vựng',
    image: 'https://picsum.photos/seed/hsk4-test/1200/400',
    level: 'HSK 4',
    desc: 'HSK 4 đánh giá khả năng giao tiếp thành thạo trong hầu hết các lĩnh vực với khoảng 1.200 từ vựng.',
    questions: [
      { q: '"尽管…还是…" khác với "虽然…但是…" ở điểm nào?', opts: ['Giống hoàn toàn', '"尽管" nhấn mạnh hơn về sự bất chấp', '"虽然" chỉ dùng văn nói', 'Không có sự khác biệt'], ans: 1 },
      { q: '他被老板___了。Từ nào KHÔNG phù hợp?', opts: ['批评', '表扬', '解雇', '喜欢'], ans: 3 },
      { q: '"宁可…也不…" diễn đạt ý gì?', opts: ['Muốn cả hai', 'Thà…còn hơn…', 'Không muốn cái nào', 'Chấp nhận cả hai'], ans: 1 },
      { q: '"是…的" câu dùng để nhấn mạnh điều gì?', opts: ['Trạng thái hiện tại', 'Thông tin đã xảy ra (thời gian/địa điểm/cách thức)', 'Mệnh lệnh', 'Nghi vấn'], ans: 1 },
      { q: '我对这件事___了解。Từ điền đúng?', opts: ['不太', '非常', '有点', 'cả 3'], ans: 3 },
    ],
  },
  hsk5: {
    title: 'Kiểm Tra Đầu Vào HSK 5',
    subtitle: 'Đánh giá trình độ cao cấp sơ – khoảng 2.500 từ vựng',
    image: 'https://picsum.photos/seed/hsk5-test/1200/400',
    level: 'HSK 5',
    desc: 'HSK 5 đánh giá khả năng đọc báo, tạp chí và xem phim tiếng Trung, giao tiếp tự nhiên với người bản ngữ.',
    questions: [
      { q: '"莫名其妙" có nghĩa là gì?', opts: ['Rõ ràng minh bạch', 'Không rõ lý do/khó hiểu', 'Vô cùng vui mừng', 'Suy nghĩ kỹ lưỡng'], ans: 1 },
      { q: '"望尘莫及" dùng trong ngữ cảnh nào?', opts: ['Hít thở không khí trong lành', 'Không theo kịp, thua xa người khác', 'Nhớ nhung quê hương', 'Chờ đợi lâu'], ans: 1 },
      { q: '下列哪个成语与"失败"有关？', opts: ['一帆风顺', '马到成功', '功败垂成', '旗开得胜'], ans: 2 },
      { q: '"置之度外" nghĩa là gì?', opts: ['Đặt ở bên ngoài', 'Không quan tâm, bỏ qua', 'Sắp xếp cẩn thận', 'Đo đạc chính xác'], ans: 1 },
      { q: '"循序渐进" mô tả cách làm việc như thế nào?', opts: ['Làm nhanh', 'Làm theo thứ tự, từng bước một', 'Làm ẩu', 'Làm lại từ đầu'], ans: 1 },
    ],
  },
  hsk6: {
    title: 'Kiểm Tra Đầu Vào HSK 6',
    subtitle: 'Đánh giá trình độ cao cấp – 5.000+ từ vựng',
    image: 'https://picsum.photos/seed/hsk6-test/1200/400',
    level: 'HSK 6',
    desc: 'HSK 6 là trình độ cao nhất, đánh giá khả năng đọc, viết và diễn đạt như người bản ngữ trong mọi lĩnh vực.',
    questions: [
      { q: '"韬光养晦" trong chính trị có nghĩa là gì?', opts: ['Phô trương sức mạnh', 'Ẩn mình chờ thời cơ', 'Đối đầu trực tiếp', 'Liên minh chiến lược'], ans: 1 },
      { q: 'Đoạn văn dùng "欲扬先抑" là biện pháp tu từ gì?', opts: ['So sánh', 'Muốn khen trước tiên chê', 'Điệp ngữ', 'Ẩn dụ'], ans: 1 },
      { q: '"不以物喜，不以己悲" trích từ tác phẩm nào?', opts: ['论语', '岳阳楼记', '出师表', '赤壁赋'], ans: 1 },
      { q: '"振聋发聩" nghĩa bóng là gì?', opts: ['Âm thanh rất to', 'Lời nói/văn chương có sức lay chuyển mạnh', 'Điếc tai', 'Bình thường'], ans: 1 },
      { q: 'Thành ngữ nào thể hiện tinh thần kiên trì nhất?', opts: ['半途而废', '愚公移山', '一曝十寒', '三天打鱼两天晒网'], ans: 1 },
    ],
  },
};

// ── Quiz component ───────────────────────────────────────────────────────────

function QuizSection({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.ans).length
    : 0;

  return (
    <div>
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">Bài Kiểm Tra Thử</h2>
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="font-bold text-gray-800 mb-4">
              <span className="text-red-600 mr-2">Câu {i + 1}.</span>{q.q}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.opts.map((opt, j) => {
                let style = 'border border-gray-200 text-gray-700 bg-gray-50 hover:border-red-400 hover:bg-red-50';
                if (submitted) {
                  if (j === q.ans) style = 'border-2 border-green-500 bg-green-50 text-green-800 font-bold';
                  else if (answers[i] === j) style = 'border-2 border-red-400 bg-red-50 text-red-700 line-through';
                  else style = 'border border-gray-200 text-gray-400 bg-gray-50';
                } else if (answers[i] === j) {
                  style = 'border-2 border-red-500 bg-red-50 text-red-700 font-bold';
                }
                return (
                  <button
                    key={j}
                    disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [i]: j }))}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-150 ${style}`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + j)}.</span>{opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors"
        >
          Nộp bài ({Object.keys(answers).length}/{questions.length} câu)
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 rounded-xl p-6 text-center ${score >= Math.ceil(questions.length * 0.6) ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}
          >
            <div className="text-4xl font-extrabold mb-2">
              {score}/{questions.length}
            </div>
            <p className="font-bold text-lg mb-1">
              {score >= Math.ceil(questions.length * 0.6) ? '🎉 Bạn đã đạt trình độ này!' : '📚 Bạn cần ôn luyện thêm!'}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              {score >= Math.ceil(questions.length * 0.6)
                ? 'Chúc mừng! Trình độ của bạn phù hợp với cấp độ này. Hãy đăng ký để học lên cấp cao hơn!'
                : 'Hãy đăng ký để được tư vấn lộ trình học phù hợp nhất với trình độ hiện tại của bạn.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setAnswers({}); setSubmitted(false); }}
                className="border-2 border-gray-300 text-gray-700 font-bold px-5 py-2.5 rounded-lg hover:border-gray-400 transition-colors text-sm"
              >
                Làm lại
              </button>
              <button
                onClick={openRegistrationModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Đăng ký tư vấn →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function KiemTraPage() {
  const { slug } = useParams();
  const data = TEST_DATA[slug] || TEST_DATA['hsk3'];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-60 overflow-hidden">
          <Image src={data.image} alt={data.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-custom">
            <p className="text-white/60 text-xs mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              {' / '}
              <span className="text-white/80">Kiểm tra đầu vào / {data.level}</span>
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{data.title}</h1>
            <p className="text-white/80 mt-1 text-sm">{data.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* Main */}
            <div>
              {/* Level tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'].map((lvl) => (
                  <Link
                    key={lvl}
                    href={`/kiem-tra/${lvl}`}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-colors ${slug === lvl ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {TEST_DATA[lvl].level}
                  </Link>
                ))}
              </div>

              {/* Description */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
                <h2 className="font-extrabold text-blue-800 mb-2">Giới thiệu {data.level}</h2>
                <p className="text-blue-700 text-sm leading-relaxed">{data.desc}</p>
              </div>

              {/* Quiz */}
              <QuizSection questions={data.questions} />
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
