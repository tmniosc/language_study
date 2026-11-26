/* Nội dung luyện phản xạ nói. Tải bằng thẻ <script>, không fetch — mở file:// vẫn chạy.
   window.SPEAK.selftalk : gợi ý tự thuật (độc thoại) bằng tiếng Việt, kèm một đoạn mẫu tiếng Anh {p, en, keys, vi}.
   window.SPEAK.intents  : một Ý MUỐN NÓI (không phải câu để dịch) -> vài cách nói tự nhiên theo khối.
                           key = khối chốt trong câu, trang sẽ tô đậm. */
window.SPEAK = {

  // --- Độc thoại: nghĩ thẳng bằng tiếng Anh, không ai nghe, không sợ sai ---
  //     p = gợi ý; bấm vào thì sổ ra đoạn mẫu: en = một người nghĩ thành lời bằng câu đơn giản,
  //     keys = khối tô đậm trong đoạn, vi = nghĩa. Mẫu chỉ để tham khảo: tự nói trước, rồi mới mở.
  selftalk: [
    { p: "Kể lại bằng tiếng Anh: mười phút vừa rồi bạn làm gì?",
      en: "Okay, what did I just do? I got up, made some coffee, and sat back down at my desk. Then I checked my phone — just for a second, I told myself — and ended up scrolling for five minutes. Classic. Now I'm back to work. I need to reply to two emails before lunch, so let's get started.",
      keys: ["sat back down", "just for a second", "ended up", "back to work", "let's get started"],
      vi: "Rồi, mình vừa làm gì nhỉ? Mình đứng dậy, pha ít cà phê rồi ngồi lại vào bàn. Xong mình xem điện thoại — chỉ một giây thôi, mình tự nhủ — rốt cuộc lướt mất năm phút. Đúng kiểu. Giờ quay lại làm việc. Phải trả lời hai email trước bữa trưa, nên bắt đầu thôi." },

    { p: "Nhìn quanh chỗ bạn ngồi, tả ba thứ bạn thấy.",
      en: "Right in front of me there's my laptop, with a sticky note on the screen that says “call the bank.” I still haven't done that. Next to it, there's a cup of tea that's gone cold. And on the left, there's a little plant my friend gave me. It looks a bit dry, so I should probably water it.",
      keys: ["Right in front of me", "I still haven't", "Next to it", "gone cold", "I should probably"],
      vi: "Ngay trước mặt mình là cái laptop, trên màn hình dán tờ giấy ghi “gọi ngân hàng”. Mình vẫn chưa gọi. Bên cạnh là cốc trà đã nguội. Còn bên trái là chậu cây nhỏ bạn tặng. Trông hơi khô, chắc nên tưới nước." },

    { p: "Hôm nay bạn định ăn gì? Nói luôn lý do.",
      en: "For lunch, I'm thinking of having noodle soup. It's cold today, and I feel like something hot. Plus, there's a good place just around the corner, so I don't have to go far. For dinner, I'm not sure yet. Maybe I'll just cook some rice and eggs at home — quick and cheap.",
      keys: ["I'm thinking of", "I feel like", "Plus", "just around the corner", "not sure yet", "quick and cheap"],
      vi: "Trưa nay mình định ăn một tô mì nước. Hôm nay trời lạnh, thèm món gì nóng nóng. Với lại có quán ngon ngay góc đường, khỏi đi xa. Tối thì chưa biết. Có khi nấu cơm với trứng ở nhà — nhanh mà rẻ." },

    { p: "Thuật lại từng bước bạn vừa pha một ly nước hoặc cà phê.",
      en: "First, I boil some water. While I'm waiting, I grab a mug and put in two spoons of coffee. Oops, a bit too much. Never mind. The water's ready, so I pour it in slowly and stir. I add a little milk — not too much — and that's it. Hmm, it smells good. Time to sit down and enjoy it.",
      keys: ["While I'm waiting", "a bit too much", "Never mind", "that's it", "Time to"],
      vi: "Trước tiên, mình đun nước. Trong lúc chờ, lấy cái cốc, cho vào hai thìa cà phê. Ối, hơi nhiều. Thôi kệ. Nước sôi rồi, rót từ từ rồi khuấy. Thêm chút sữa — không nhiều quá — vậy là xong. Hừm, thơm ghê. Ngồi xuống thưởng thức thôi." },

    { p: "Hôm nay bạn thấy trong người thế nào? Vì sao?",
      en: "Honestly, I'm a bit tired today. I didn't sleep well last night because it was so hot. My head feels heavy and I keep yawning. But I'm not in a bad mood. I think a short walk after lunch will help. And maybe I'll go to bed early tonight — for real this time.",
      keys: ["Honestly", "didn't sleep well", "I keep", "in a bad mood", "will help", "for real this time"],
      vi: "Nói thật, hôm nay mình hơi mệt. Tối qua ngủ không ngon vì nóng quá. Đầu thấy nặng, ngáp liên tục. Nhưng tâm trạng không tệ. Chắc đi bộ một chút sau bữa trưa sẽ đỡ. Và có lẽ tối nay đi ngủ sớm — lần này là thật." },

    { p: "Kể một việc khiến bạn bực mình gần đây.",
      en: "Something that annoyed me this week? Oh, I know. I ordered a pair of shoes online, and they sent me the wrong size. So I had to pack them up, go to the post office, and wait in line for half an hour. And the new pair still hasn't arrived. What a waste of time.",
      keys: ["Oh, I know", "the wrong size", "pack them up", "wait in line", "still hasn't arrived", "What a waste of time"],
      vi: "Chuyện làm mình bực tuần này à? À, có rồi. Mình đặt một đôi giày trên mạng, họ gửi nhầm cỡ. Thế là phải đóng gói lại, ra bưu điện, xếp hàng nửa tiếng. Mà đôi mới vẫn chưa tới. Đúng là phí thời gian." },

    { p: "Tả con đường từ nhà tới chỗ làm hoặc chỗ học.",
      en: "I leave home at around seven. First, I ride down a small street full of food stalls — it always smells amazing. Then I turn left onto the main road, and that's where the traffic starts. It usually takes me twenty minutes, but when it rains, it can take forever. The last part is nice, though: there's a row of big trees right in front of my office.",
      keys: ["at around", "full of", "turn left onto", "that's where", "It usually takes me", "take forever", "though"],
      vi: "Mình ra khỏi nhà khoảng bảy giờ. Đầu tiên chạy qua một con hẻm toàn hàng ăn — lúc nào cũng thơm nức. Rồi rẽ trái ra đường lớn, và kẹt xe bắt đầu từ đó. Thường mất hai mươi phút, nhưng trời mưa thì đi mãi không tới. Đoạn cuối thì dễ chịu: có một hàng cây to ngay trước cơ quan." },

    { p: "Bạn đang lo điều gì? Nói nó thành lời.",
      en: "What am I worried about? To be honest, it's the presentation next week. I'm worried that I'll forget what to say, or that someone will ask a question I can't answer. But when I say it out loud, it doesn't sound that scary. I'll prepare, I'll practice a few times, and if I don't know something, I can just say I'll check and get back to them.",
      keys: ["To be honest", "I'm worried that", "out loud", "doesn't sound that", "a few times", "get back to them"],
      vi: "Mình đang lo gì à? Thật ra là bài thuyết trình tuần sau. Mình sợ quên mất phải nói gì, hoặc có người hỏi câu mình không trả lời được. Nhưng nói thành lời ra thì nghe cũng không đáng sợ lắm. Mình sẽ chuẩn bị, tập vài lần, còn gặp câu không biết thì cứ nói để mình kiểm tra rồi trả lời sau." },

    { p: "Giải thích công việc của bạn cho một đứa trẻ bảy tuổi.",
      en: "You know how your toys sometimes stop working? My job is a bit like that, but with machines. I check them to make sure they work properly. If something is broken, I try to find out why and fix it. It's like being a doctor, but for machines instead of people.",
      keys: ["You know how", "a bit like that", "make sure", "find out why", "It's like being", "instead of"],
      vi: "Con biết lúc đồ chơi tự nhiên không chạy nữa không? Việc của mình cũng hơi giống vậy, nhưng với máy móc. Mình kiểm tra máy để chắc là nó chạy đúng. Có gì hỏng thì tìm xem tại sao rồi sửa. Giống như làm bác sĩ, nhưng chữa cho máy thay vì cho người." },

    { p: "Kể lại bộ phim hay video bạn xem gần nhất.",
      en: "Last night I watched a video about a guy who lives alone in the mountains. He builds his own house, grows his own food, and barely talks to anyone. At first I thought it would be boring, but I couldn't stop watching. It made me want to slow down a bit. I'd never do it myself, though — I like the internet way too much.",
      keys: ["a video about", "barely", "At first I thought", "couldn't stop", "It made me want to", "way too much"],
      vi: "Tối qua mình xem một video về một anh sống một mình trên núi. Anh ấy tự dựng nhà, tự trồng rau, gần như chẳng nói chuyện với ai. Lúc đầu tưởng sẽ chán, vậy mà xem không dứt ra được. Nó làm mình muốn sống chậm lại một chút. Nhưng tự mình làm thì chắc không bao giờ — mình mê internet quá." },

    { p: "Ngày mai bạn phải làm những gì? Liệt kê ra.",
      en: "Let's see, tomorrow is going to be busy. In the morning I have a meeting at nine, so I can't be late. After that, I need to finish the report I've been putting off. In the afternoon I have to pick up a package and buy some groceries. If I have time in the evening, I'll call my mom. Okay, that's a lot, but it's doable.",
      keys: ["Let's see", "is going to be", "After that", "putting off", "pick up", "If I have time", "doable"],
      vi: "Để xem, mai sẽ bận đây. Sáng có cuộc họp lúc chín giờ, nên không được trễ. Sau đó phải làm xong bản báo cáo cứ lần lữa mãi. Chiều phải đi lấy một gói hàng và mua đồ ăn. Tối mà rảnh thì gọi cho mẹ. Rồi, nhiều thật, nhưng làm được." },

    { p: "Vì sao bạn học tiếng Anh? Nói trong 30 giây.",
      en: "Why am I learning English? Well, mainly for work. A lot of the documents I read are in English, and sometimes I have to talk to customers from other countries. But it's not just that. I want to watch movies without subtitles and travel without feeling lost. The hardest part for me is speaking, so that's what I'm working on now.",
      keys: ["mainly for", "A lot of", "it's not just that", "The hardest part for me is", "that's what I'm working on"],
      vi: "Sao mình học tiếng Anh à? Chủ yếu là vì công việc. Nhiều tài liệu mình đọc là tiếng Anh, thỉnh thoảng còn phải nói chuyện với khách nước ngoài. Nhưng không chỉ vậy. Mình muốn xem phim không cần phụ đề, đi du lịch mà không thấy lạc lõng. Khó nhất với mình là nói, nên giờ đang tập đúng cái đó." },

    { p: "Tả món ăn bạn thích nhất, nói sao cho người nghe thèm.",
      en: "My favorite dish is grilled pork with rice noodles. The pork is grilled over charcoal, so it's a little smoky and sweet. You dip everything in a bowl of warm fish sauce with garlic and chili, then add lots of fresh herbs. Every bite is salty, sweet, sour, and fresh at the same time. Just talking about it makes me hungry.",
      keys: ["My favorite dish is", "a little smoky", "dip everything in", "lots of", "at the same time", "makes me hungry"],
      vi: "Món mình thích nhất là bún chả. Thịt nướng trên than nên thơm mùi khói, hơi ngọt. Nhúng hết vào bát nước mắm ấm có tỏi ớt, rồi thêm thật nhiều rau thơm. Miếng nào cũng vừa mặn, ngọt, chua, vừa tươi mát. Mới nói thôi đã thấy đói." },

    { p: "Kể một kỷ niệm hồi nhỏ.",
      en: "When I was about eight, my dad took me fishing for the first time. We got up really early, before the sun came up. I didn't catch anything all morning, and I was about to give up. Then, right before we left, I felt something pull the line. It was a tiny fish, but I was so proud. I still remember how happy my dad looked.",
      keys: ["When I was about", "for the first time", "I was about to give up", "right before", "so proud", "I still remember"],
      vi: "Hồi khoảng tám tuổi, bố dẫn mình đi câu cá lần đầu. Hai bố con dậy thật sớm, trước khi mặt trời mọc. Cả buổi sáng chẳng câu được gì, mình suýt bỏ cuộc. Rồi ngay trước lúc về, thấy có gì giật dây câu. Một con cá tí hon thôi, mà mình tự hào lắm. Mình vẫn nhớ mặt bố lúc đó vui thế nào." },

    { p: "Bạn vừa nhắn tin cho ai? Tóm tắt nội dung.",
      en: "I just texted my sister. Basically, I asked her if she wants to have dinner with me on Friday. She said yes, but she might be a bit late because she has a class until seven. So we agreed to meet at seven thirty near her school. She also asked me to bring back the book she lent me last month. Oops, I forgot about that.",
      keys: ["I just texted", "Basically", "she might be a bit late", "we agreed to", "bring back", "I forgot about that"],
      vi: "Mình vừa nhắn cho em gái. Đại khái là hỏi em có muốn đi ăn tối với mình thứ Sáu không. Em bảo được, nhưng có thể đến hơi muộn vì có lớp tới bảy giờ. Nên hai đứa hẹn bảy rưỡi gần trường em. Em còn nhắc mình mang trả cuốn sách em cho mượn tháng trước. Ối, quên mất vụ đó." },

    { p: "Hôm nay khác hôm qua ở chỗ nào?",
      en: "Yesterday was a rainy, lazy day. I stayed in and didn't do much. Today is completely different. The sun is out, I've already done my laundry, and I even went for a run this morning. I feel much more awake. Funny how the weather can change your whole mood.",
      keys: ["stayed in", "didn't do much", "completely different", "The sun is out", "I even", "Funny how"],
      vi: "Hôm qua là một ngày mưa, lười biếng. Mình ở nhà, chẳng làm gì mấy. Hôm nay khác hẳn. Trời nắng, giặt đồ xong rồi, sáng nay còn chạy bộ nữa. Thấy tỉnh táo hơn nhiều. Buồn cười thật, thời tiết đổi được cả tâm trạng." },

    { p: "Nếu được nghỉ cả tuần, bạn sẽ làm gì?",
      en: "If I had a whole week off, I'd go to the beach for a few days. I'd sleep late, swim in the morning, and eat seafood every night. After that, I'd come home and finally sort out my room. And I'd turn off my work notifications, of course. Just thinking about it makes me feel relaxed.",
      keys: ["If I had", "a whole week off", "finally", "sort out", "of course", "Just thinking about it"],
      vi: "Nếu được nghỉ nguyên một tuần, mình sẽ ra biển vài hôm. Ngủ dậy muộn, sáng đi bơi, tối nào cũng ăn hải sản. Sau đó về nhà và cuối cùng cũng dọn lại căn phòng. Và dĩ nhiên là tắt thông báo công việc. Mới nghĩ tới thôi đã thấy thư thái." },

    { p: "Rủ ai đó thử một thứ bạn thích. Thuyết phục họ.",
      en: "You should really try bouldering with me. It's like rock climbing, but the walls are low, so you don't need ropes. It's not as hard as it looks, I promise. It's great exercise, and it's actually really fun, like solving a puzzle with your body. Come with me on Saturday. If you don't like it, I'll buy you dinner.",
      keys: ["You should really try", "It's like", "not as hard as it looks", "I promise", "it's actually", "Come with me", "If you don't like it"],
      vi: "Bạn nhất định phải thử leo tường với mình. Giống leo núi đá, nhưng tường thấp nên không cần dây. Không khó như nhìn đâu, thật đấy. Tập rất tốt, mà vui thật sự, kiểu giải đố bằng cả người. Thứ Bảy đi với mình nhé. Không thích thì mình bao bữa tối." },

    { p: "Tả thời tiết ngoài kia như đang kể cho một người bạn ở xa.",
      en: "You wouldn't believe the weather here today. This morning it was sunny and really hot, like thirty-five degrees. Then around three, the sky turned dark and it started pouring. The streets flooded in about ten minutes. Now it's stopped, and it's actually cool and kind of nice. Classic rainy season.",
      keys: ["You wouldn't believe", "like thirty-five degrees", "turned dark", "started pouring", "kind of nice", "rainy season"],
      vi: "Cậu không tin nổi thời tiết ở đây hôm nay đâu. Sáng thì nắng, nóng lắm, cỡ ba lăm độ. Tới khoảng ba giờ trời tối sầm rồi mưa như trút. Đường ngập sau chừng mười phút. Giờ tạnh rồi, lại mát, khá dễ chịu. Đúng kiểu mùa mưa." },

    { p: "Nói về một thói quen bạn muốn bỏ.",
      en: "I really want to stop checking my phone in bed. Every night I tell myself, just five minutes, and then suddenly it's one in the morning. The next day I'm tired and grumpy. So I'm going to try something: I'll leave my phone in the kitchen and read a book instead. Let's see how long that lasts.",
      keys: ["I really want to stop", "I tell myself", "suddenly", "I'm going to try", "instead", "Let's see how long"],
      vi: "Mình thật sự muốn bỏ thói quen nằm trên giường lướt điện thoại. Tối nào cũng tự nhủ, năm phút thôi, rồi bỗng dưng đã một giờ sáng. Hôm sau thì mệt và cáu. Nên mình sẽ thử thế này: để điện thoại ở bếp, đọc sách thay vào đó. Để xem giữ được bao lâu." },

    { p: "Điện thoại bạn đang mở app gì nhiều nhất? Vì sao.",
      en: "The app I use the most is probably YouTube. I use it for everything — music while I work, cooking videos, and English lessons. The problem is that one video always leads to another. I open it to learn something, and an hour later I'm watching a cat video. Maybe I should set a time limit.",
      keys: ["I use the most", "probably", "for everything", "The problem is that", "leads to another", "an hour later", "Maybe I should"],
      vi: "App mình dùng nhiều nhất chắc là YouTube. Dùng cho đủ thứ — nghe nhạc lúc làm việc, video nấu ăn, bài học tiếng Anh. Vấn đề là video này kéo sang video khác. Mở ra để học, một tiếng sau đã đang xem video mèo. Chắc nên đặt giới hạn thời gian." },

    { p: "Kể một lần bạn đi lạc hoặc nhầm đường.",
      en: "Last year, I took the wrong bus in a city I didn't know. I was sure it was going downtown, but after twenty minutes we were in the middle of nowhere. I got off and asked a lady at a little shop for help. She didn't speak much English, but she pointed, drew me a map, and even gave me some water. I made it in the end — just an hour late.",
      keys: ["took the wrong bus", "I was sure", "in the middle of nowhere", "got off", "drew me a map", "made it in the end"],
      vi: "Năm ngoái mình lên nhầm xe buýt ở một thành phố lạ. Cứ chắc mẩm là xe vào trung tâm, vậy mà hai mươi phút sau đã ở chỗ đồng không mông quạnh. Mình xuống xe, nhờ một cô bán hàng ở tiệm nhỏ giúp. Cô không nói được mấy tiếng Anh, nhưng chỉ đường, vẽ cho mình cái bản đồ, còn cho cả nước uống. Cuối cùng cũng tới nơi — trễ có một tiếng." },

    { p: "Hôm nay bạn biết ơn điều gì?",
      en: "Today I'm grateful for small things. My coworker helped me fix a problem I'd been stuck on for two days. The coffee this morning was really good. And my mom called just to ask if I'd eaten. None of it is a big deal, but together it made today a good day.",
      keys: ["I'm grateful for", "stuck on", "just to ask", "None of it is a big deal", "made today a good day"],
      vi: "Hôm nay mình biết ơn những điều nhỏ. Đồng nghiệp giúp gỡ một vấn đề mình bí suốt hai ngày. Cà phê sáng nay ngon thật. Và mẹ gọi điện chỉ để hỏi ăn cơm chưa. Chẳng có gì to tát, nhưng gộp lại thành một ngày tốt lành." },

    { p: "Hướng dẫn ai đó nấu một món bạn biết nấu.",
      en: "Okay, let me show you how to make a simple omelet. First, crack three eggs into a bowl, add a pinch of salt, and beat them well. Heat a little oil in a pan — not too hot. Pour in the eggs and let them cook for a minute. When the bottom is set, fold it in half. That's it. Easy, right?",
      keys: ["let me show you how to", "crack", "a pinch of", "not too hot", "Pour in", "fold it in half", "Easy, right?"],
      vi: "Rồi, để mình chỉ bạn làm trứng ốp-lết đơn giản. Đầu tiên, đập ba quả trứng vào bát, thêm một nhúm muối, đánh thật đều. Đun chút dầu trong chảo — đừng nóng quá. Đổ trứng vào, để chín chừng một phút. Mặt dưới se lại thì gập đôi. Xong. Dễ đúng không?" },

    { p: "Bạn vừa học được gì mới? Giải thích lại cho chính mình.",
      en: "Today I learned that “make” and “do” are not the same. You use “make” when you create something, like make a cake or make a mistake. You use “do” for tasks and jobs, like do the dishes or do your homework. So it's “make a decision,” not “do a decision.” Okay, I think I've got it now.",
      keys: ["Today I learned that", "are not the same", "You use", "I think I've got it"],
      vi: "Hôm nay mình học được là “make” với “do” không giống nhau. Dùng “make” khi tạo ra cái gì đó, như make a cake (làm bánh) hay make a mistake (mắc lỗi). Dùng “do” cho việc, nhiệm vụ, như do the dishes (rửa bát) hay do your homework (làm bài tập). Nên phải nói “make a decision”, không phải “do a decision”. Rồi, chắc giờ hiểu rồi." },

    { p: "Tả một người bạn thân: tính cách họ ra sao.",
      en: "My best friend is one of the calmest people I know. Nothing seems to stress her out. When I panic about something, she just listens and says, “Okay, what can we do about it?” She's also really funny, but in a quiet way — she'll say one short line and everyone bursts out laughing. I'm lucky to have her.",
      keys: ["one of the calmest people I know", "stress her out", "what can we do about it", "in a quiet way", "bursts out laughing", "I'm lucky to have"],
      vi: "Bạn thân của mình là một trong những người điềm tĩnh nhất mình biết. Có vẻ chẳng gì làm bạn ấy căng thẳng được. Khi mình hoảng lên vì chuyện gì, bạn ấy chỉ nghe rồi bảo: “Rồi, giờ mình làm được gì nào?” Bạn ấy cũng rất hài hước, nhưng kiểu lặng lẽ — buông đúng một câu ngắn là cả đám phá lên cười. Mình may mắn khi có bạn ấy." },

    { p: "Kể lại cuộc trò chuyện gần nhất bạn có.",
      en: "The last conversation I had was with a guy at the repair shop. I told him my laptop was making a strange noise. He asked how long it had been doing that, and I said about a week. He opened it up and said the fan was full of dust. He cleaned it in ten minutes and didn't even charge me. Nice guy.",
      keys: ["The last conversation I had", "I told him", "making a strange noise", "how long it had been", "full of dust", "didn't even charge me"],
      vi: "Cuộc nói chuyện gần nhất của mình là với anh thợ ở tiệm sửa máy. Mình kể laptop đang kêu tiếng lạ. Anh hỏi bị vậy bao lâu rồi, mình bảo khoảng một tuần. Anh mở ra rồi bảo quạt đầy bụi. Anh vệ sinh mất mười phút, còn không lấy tiền. Tốt bụng ghê." },

    { p: "Điều gì làm bạn cười gần đây?",
      en: "Yesterday my neighbor's little boy saw me in the elevator and said, very seriously, “Your hair looks like a bird's nest.” His mom was so embarrassed, but I couldn't stop laughing. To be fair, he was right — I'd just woken up. Kids are brutally honest.",
      keys: ["very seriously", "looks like", "so embarrassed", "couldn't stop laughing", "To be fair", "brutally honest"],
      vi: "Hôm qua cậu bé nhà hàng xóm gặp mình trong thang máy và nói rất nghiêm túc: “Tóc trông như tổ chim.” Mẹ cậu bé ngượng chín người, còn mình thì cười không dứt. Mà công nhận cậu nói đúng — mình vừa ngủ dậy. Trẻ con thật thà đến phũ." },

    { p: "Nếu đổi được một việc trong hôm nay, bạn đổi gì?",
      en: "If I could change one thing about today, I'd leave home ten minutes earlier. Because I was in a rush, I forgot my lunch and had to buy something expensive near the office. I was also stressed all morning. Ten minutes doesn't sound like much, but it would have made a big difference.",
      keys: ["If I could change", "in a rush", "had to", "doesn't sound like much", "would have made a big difference"],
      vi: "Nếu đổi được một việc hôm nay, mình sẽ ra khỏi nhà sớm hơn mười phút. Vì vội nên quên mang cơm trưa, phải mua đồ đắt gần cơ quan. Cả buổi sáng còn căng thẳng nữa. Mười phút nghe thì chẳng bao nhiêu, nhưng đã có thể khác hẳn." },

    { p: "Lên kế hoạch cuối tuần này, nói thành lời.",
      en: "So, what am I doing this weekend? On Saturday morning I want to sleep in — no alarm. In the afternoon I might meet a friend for coffee, if she's free. On Sunday I should really clean my room; it's a mess. And in the evening I'll cook something nice and watch a movie. Nothing special, but that sounds perfect to me.",
      keys: ["sleep in", "I might", "if she's free", "I should really", "it's a mess", "Nothing special", "sounds perfect to me"],
      vi: "Rồi, cuối tuần này làm gì đây? Sáng thứ Bảy muốn ngủ nướng — không báo thức. Chiều có thể đi cà phê với một người bạn, nếu bạn ấy rảnh. Chủ nhật thì thật sự nên dọn phòng; bừa quá rồi. Tối nấu món gì ngon ngon rồi xem phim. Chẳng có gì đặc biệt, nhưng với mình vậy là tuyệt." },

    { p: "Bạn đang đọc hoặc xem gì dở dang? Kể tới đâu rồi.",
      en: "Right now I'm halfway through a crime series. A detective is trying to find out who stole a famous painting from a museum. At first, everyone thought it was the security guard, but now it looks like the museum director is involved. I'm on episode six, and I have no idea how it's going to end. No spoilers, please.",
      keys: ["halfway through", "trying to find out", "At first, everyone thought", "it looks like", "I'm on episode", "no idea how", "No spoilers"],
      vi: "Giờ mình đang xem dở một bộ phim trinh thám. Một thám tử đang tìm xem ai đã lấy trộm bức tranh nổi tiếng trong bảo tàng. Lúc đầu ai cũng nghĩ là anh bảo vệ, nhưng giờ có vẻ ông giám đốc bảo tàng cũng dính vào. Mình đang ở tập sáu, hoàn toàn không đoán được kết thúc ra sao. Đừng tiết lộ nhé." },

    { p: "Tả căn phòng trong mơ của bạn.",
      en: "My dream room would be small but bright, with a big window facing the trees. There'd be a wide desk by the window and a comfortable chair, so I could work and still see outside. One wall would be covered in bookshelves. No TV — just a good speaker for music. And a lot of plants, if I can keep them alive.",
      keys: ["My dream room would be", "facing", "There'd be", "so I could", "covered in", "if I can keep them alive"],
      vi: "Căn phòng trong mơ của mình sẽ nhỏ nhưng sáng, có ô cửa sổ lớn nhìn ra hàng cây. Sẽ có cái bàn rộng sát cửa sổ và cái ghế êm, để vừa làm việc vừa ngắm ra ngoài. Một bức tường phủ kín giá sách. Không TV — chỉ một cái loa tốt để nghe nhạc. Và thật nhiều cây, nếu mình giữ cho chúng sống được." }
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
