/* Nội dung luyện phản xạ nói. Tải bằng thẻ <script>, không fetch — mở file:// vẫn chạy.
   window.SPEAK.selftalk : câu gợi ý tự thuật (độc thoại) — hướng dẫn tiếng Việt, bạn nói ra tiếng Anh.
   window.SPEAK.intents  : một Ý MUỐN NÓI (không phải câu để dịch) -> vài cách nói tự nhiên theo khối.
                           key = khối chốt trong câu, trang sẽ tô đậm. */
window.SPEAK = {

  // --- Độc thoại: nghĩ thẳng bằng tiếng Anh, không ai nghe, không sợ sai ---
  selftalk: [
    "Kể lại bằng tiếng Anh: mười phút vừa rồi bạn làm gì?",
    "Nhìn quanh chỗ bạn ngồi, tả ba thứ bạn thấy.",
    "Hôm nay bạn định ăn gì? Nói luôn lý do.",
    "Thuật lại từng bước bạn vừa pha một ly nước hoặc cà phê.",
    "Hôm nay bạn thấy trong người thế nào? Vì sao?",
    "Kể một việc khiến bạn bực mình gần đây.",
    "Tả con đường từ nhà tới chỗ làm hoặc chỗ học.",
    "Bạn đang lo điều gì? Nói nó thành lời.",
    "Giải thích công việc của bạn cho một đứa trẻ bảy tuổi.",
    "Kể lại bộ phim hay video bạn xem gần nhất.",
    "Ngày mai bạn phải làm những gì? Liệt kê ra.",
    "Vì sao bạn học tiếng Anh? Nói trong 30 giây.",
    "Tả món ăn bạn thích nhất, nói sao cho người nghe thèm.",
    "Kể một kỷ niệm hồi nhỏ.",
    "Bạn vừa nhắn tin cho ai? Tóm tắt nội dung.",
    "Hôm nay khác hôm qua ở chỗ nào?",
    "Nếu được nghỉ cả tuần, bạn sẽ làm gì?",
    "Rủ ai đó thử một thứ bạn thích. Thuyết phục họ.",
    "Tả thời tiết ngoài kia như đang kể cho một người bạn ở xa.",
    "Nói về một thói quen bạn muốn bỏ.",
    "Điện thoại bạn đang mở app gì nhiều nhất? Vì sao.",
    "Kể một lần bạn đi lạc hoặc nhầm đường.",
    "Hôm nay bạn biết ơn điều gì?",
    "Hướng dẫn ai đó nấu một món bạn biết nấu.",
    "Bạn vừa học được gì mới? Giải thích lại cho chính mình.",
    "Tả một người bạn thân: tính cách họ ra sao.",
    "Kể lại cuộc trò chuyện gần nhất bạn có.",
    "Điều gì làm bạn cười gần đây?",
    "Nếu đổi được một việc trong hôm nay, bạn đổi gì?",
    "Lên kế hoạch cuối tuần này, nói thành lời.",
    "Bạn đang đọc hoặc xem gì dở dang? Kể tới đâu rồi.",
    "Tả căn phòng trong mơ của bạn."
  ],

  // --- Diễn đạt Ý: có ý muốn nói -> với lấy khối có sẵn, không ráp từng từ ---
  intents: [
    { vi: "Từ chối một lời mời mà vẫn giữ quan hệ tốt", models: [
      { en: "I'd love to, but I can't make it this time.", key: "I'd love to, but" },
      { en: "That sounds great — unfortunately I'm tied up that day.", key: "I'm tied up" },
      { en: "Can I take a rain check?", key: "take a rain check" }
    ]},
    { vi: "Chưa nghe rõ, muốn người ta nói lại", models: [
      { en: "Sorry, could you say that again?", key: "could you say that again" },
      { en: "I didn't quite catch that.", key: "didn't quite catch that" },
      { en: "What do you mean by that?", key: "what do you mean by" }
    ]},
    { vi: "Cần một chút thời gian suy nghĩ trước khi trả lời", models: [
      { en: "Let me think about it for a second.", key: "let me think about it" },
      { en: "Give me a moment.", key: "give me a moment" },
      { en: "Hmm, that's a good question.", key: "that's a good question" }
    ]},
    { vi: "Đưa ra ý kiến nhưng không chắc chắn", models: [
      { en: "I'm not sure, but I think it's worth a try.", key: "I'm not sure, but" },
      { en: "If you ask me, we should wait.", key: "if you ask me" },
      { en: "It seems to me that it's too early.", key: "it seems to me that" }
    ]},
    { vi: "Không đồng ý, nhưng nói cho lịch sự", models: [
      { en: "I see your point, but I'm not sure it works here.", key: "I see your point, but" },
      { en: "I'm not so sure about that.", key: "I'm not so sure about that" },
      { en: "That's true, but on the other hand it costs more.", key: "on the other hand" }
    ]},
    { vi: "Bắt đầu kể một câu chuyện", models: [
      { en: "So, the other day something funny happened.", key: "the other day" },
      { en: "You won't believe what happened.", key: "you won't believe what" },
      { en: "Okay, long story short, we missed the train.", key: "long story short" }
    ]},
    { vi: "Quên mất từ cần nói — đừng khựng, nói vòng", models: [
      { en: "It's like a... you know, the thing you use to open cans.", key: "the thing you use to" },
      { en: "I forget the word, but it's kind of like a box.", key: "it's kind of like" },
      { en: "How do you say “tua vít” in English?", key: "how do you say" }
    ]},
    { vi: "Xin lỗi vì đến muộn", models: [
      { en: "Sorry I'm late, the traffic was terrible.", key: "sorry I'm late" },
      { en: "I got held up at work.", key: "got held up" }
    ]},
    { vi: "Đồng ý một cách nhiệt tình", models: [
      { en: "Yeah, totally.", key: "totally" },
      { en: "Sounds good to me.", key: "sounds good to me" },
      { en: "I'm in.", key: "I'm in" }
    ]},
    { vi: "Hỏi xem người kia muốn gì", models: [
      { en: "What do you feel like doing?", key: "what do you feel like" },
      { en: "It's up to you.", key: "up to you" },
      { en: "Whatever works for you.", key: "whatever works for you" }
    ]},
    { vi: "Nói là bạn đang bận, để nói sau", models: [
      { en: "Can we talk later? I'm in the middle of something.", key: "in the middle of something" },
      { en: "I'll get back to you.", key: "get back to you" }
    ]},
    { vi: "Khen ai đó", models: [
      { en: "You did a great job.", key: "did a great job" },
      { en: "I'm really impressed.", key: "really impressed" },
      { en: "That was really well done.", key: "well done" }
    ]},
    { vi: "Nói rằng bạn thấy sao cũng được", models: [
      { en: "It doesn't matter to me.", key: "doesn't matter to me" },
      { en: "Either way is fine.", key: "either way is fine" },
      { en: "I don't mind.", key: "I don't mind" }
    ]},
    { vi: "Chuyển sang chủ đề khác", models: [
      { en: "By the way, did you finish the report?", key: "by the way" },
      { en: "Speaking of which, I saw her yesterday.", key: "speaking of which" },
      { en: "That reminds me, I owe you money.", key: "that reminds me" }
    ]},
    { vi: "Xác nhận là bạn đã hiểu", models: [
      { en: "Got it.", key: "got it" },
      { en: "That makes sense.", key: "makes sense" },
      { en: "Oh, I see what you mean.", key: "I see what you mean" }
    ]},
    { vi: "Rào đón trước khi nói một điều khó nghe", models: [
      { en: "Don't take this the wrong way, but it's a bit late.", key: "take this the wrong way" },
      { en: "To be honest, I didn't like it.", key: "to be honest" },
      { en: "No offense, but that won't work.", key: "no offense, but" }
    ]},
    { vi: "Hỏi một điều hơi tế nhị", models: [
      { en: "Do you mind if I ask how much it cost?", key: "do you mind if I ask" },
      { en: "Just out of curiosity, how old are you?", key: "out of curiosity" }
    ]},
    { vi: "Kết thúc cuộc trò chuyện một cách lịch sự", models: [
      { en: "Anyway, I should get going.", key: "I should get going" },
      { en: "It was nice talking to you.", key: "nice talking to you" },
      { en: "Let's catch up soon.", key: "catch up soon" }
    ]},
    { vi: "Gần như đồng ý, còn chút băn khoăn", models: [
      { en: "I'm leaning towards yes, but let me check first.", key: "leaning towards" },
      { en: "For the most part, yes.", key: "for the most part" }
    ]},
    { vi: "Nhờ ai đó giúp một tay", models: [
      { en: "Could you give me a hand?", key: "give me a hand" },
      { en: "Would you mind helping me with this?", key: "would you mind" }
    ]},
    { vi: "Nói thẳng là bạn không biết", models: [
      { en: "I have no idea.", key: "no idea" },
      { en: "Your guess is as good as mine.", key: "your guess is as good as mine" },
      { en: "Beats me.", key: "beats me" }
    ]},
    { vi: "Trấn an ai đó, bảo đừng lo", models: [
      { en: "Don't worry about it.", key: "don't worry about it" },
      { en: "It's not a big deal.", key: "not a big deal" },
      { en: "It happens.", key: "it happens" }
    ]},
    { vi: "Xin phép nói xen vào", models: [
      { en: "Can I just say one thing?", key: "can I just say" },
      { en: "Sorry to interrupt, but...", key: "sorry to interrupt" }
    ]}
  ]
};
