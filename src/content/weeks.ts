import type { Week } from './types'

// Thứ tự trong mảng = thứ tự trên bản đồ.
// Mở một vùng mới: đặt unlocked: true. Công bố lời giải: đặt solutionReleased: true.
// Phần "Kỹ năng mới" của mỗi tuần nằm trong file src/content/weeks/<slug>.md
export const weeks: Week[] = [
  {
    slug: 'tuan-03',
    week: 3,
    region: 'Làng Khởi Đầu',
    icon: 'village',
    concept: 'Lớp và đối tượng',
    reference: 'Bài tập thực hành 3: Lớp và đối tượng',
    unlocked: true,
    quest:
      'Một con rồng xuất hiện ở rìa làng. Chưa có anh hùng nào cả, chỉ có những biến rời rạc hp1, hp2, atk1, atk2… Hãy gom chúng lại thành một khuôn mẫu chung tên là Character, rồi tạo ra hai đối tượng: một người và một con rồng.',
    feature: 'Trận đấu 1v1 đầu tiên: người đấu rồng, ai nhanh hơn đánh trước.',
    classes: [
      {
        name: 'Character',
        change: 'new',
        attributes: [
          { vis: '+', text: 'HP: double' },
          { vis: '+', text: 'PAtk: double' },
          { vis: '+', text: 'Speed: double' },
        ],
        methods: [
          { vis: '+', text: 'SetInformation(): void' },
          { vis: '+', text: 'Attack(target: Character&): void' },
        ],
      },
    ],
    solutionCode: 'week03/main.cpp',
    solutionReleased: true,
    exercises: [
      { title: 'e11 · Lớp HCN', description: 'Hình chữ nhật với length, width, area(), perimeter().' },
      { title: 'e12 · Lớp Circle', description: 'Setter setR() kiểm tra bán kính trước khi ghi.' },
      { title: 'e13 · Lớp Student', description: 'Tính năm sinh, setter setAge() với điều kiện 6 ≤ age ≤ 66.' },
      { title: 'e14 · Lớp Body', description: 'Động năng KE() và các setter đảm bảo dữ liệu hợp lệ.' },
      { title: 'e15 · Lớp Triangle', description: 'Getter cạnh, chu vi, diện tích và xác định kiểu tam giác.' },
      {
        title: 'Thử thách boss: Bình máu',
        description:
          'Thêm phương thức Heal(amount) cho Character. Người chơi được hồi máu đúng một lần khi HP xuống dưới 30%.',
        boss: true,
      },
    ],
  },
  {
    slug: 'tuan-04',
    week: 4,
    region: 'Pháo Đài Private',
    icon: 'castle',
    concept: 'Phạm vi truy cập, constructor, destructor',
    reference: 'Bài tập thực hành 4: Phạm vi truy cập, constructor, destructor',
    unlocked: true,
    quest:
      'Có kẻ đã lẻn vào main() và viết dragon.HP = -999; con rồng gục ngã trước cả khi trận đấu bắt đầu. Ai cũng có thể sửa chỉ số, HP còn bị âm. Hãy dựng tường thành bảo vệ chỉ số nhân vật!',
    feature: 'Nhân vật có tên, phòng thủ, không thể bị hack chỉ số; trận đấu chỉ còn một vòng lặp.',
    classes: [
      {
        name: 'Character',
        attributes: [
          { vis: '-', text: 'name: string', change: 'new' },
          { vis: '-', text: 'HP: double', change: 'changed' },
          { vis: '-', text: 'maxHP: double', change: 'new' },
          { vis: '-', text: 'PAtk: double', change: 'changed' },
          { vis: '-', text: 'Def: double', change: 'new' },
          { vis: '-', text: 'Speed: double', change: 'changed' },
        ],
        methods: [
          { vis: '+', text: 'Character()', change: 'new' },
          { vis: '+', text: 'Character(name, HP, PAtk, Def, Speed)', change: 'new' },
          { vis: '+', text: '~Character()', change: 'new' },
          { vis: '+', text: 'SetInformation(name, HP, PAtk, Def, Speed): bool', change: 'changed' },
          { vis: '+', text: 'GetName(): string', change: 'new' },
          { vis: '+', text: 'GetHP(): double', change: 'new' },
          { vis: '+', text: 'GetSpeed(): double', change: 'new' },
          { vis: '+', text: 'IsAlive(): bool', change: 'new' },
          { vis: '+', text: 'TakeDamage(rawDamage: double): double', change: 'new' },
          { vis: '+', text: 'Attack(target: Character&): double', change: 'changed' },
          { vis: '+', text: 'PrintInfo(): void', change: 'new' },
        ],
      },
    ],
    starterCode: 'week03/main.cpp',
    solutionCode: 'week04/main.cpp',
    solutionReleased: false,
    exercises: [
      { title: 'Lớp Student với thuộc tính private', description: 'Thử gán trực tiếp s1.name rồi nhận xét lỗi; bổ sung getter, setter.' },
      { title: 'Student: ngày sinh và constructor', description: 'Setter kiểm tra dữ liệu, constructor gán giá trị mặc định, tính tuổi từ ngày sinh.' },
      { title: 'Lớp Body với thuộc tính private', description: 'Viết lại lớp Body tuần trước theo quy ước private + getter/setter.' },
      {
        title: 'Thử thách boss: Bình máu có giới hạn',
        description:
          'Thêm Heal(amount) sao cho HP không bao giờ vượt quá maxHP, và trả về lượng máu thực sự được hồi.',
        boss: true,
      },
    ],
  },
  {
    slug: 'tuan-05',
    week: 5,
    region: 'Học Viện Kế Thừa',
    icon: 'academy',
    concept: 'Kế thừa',
    reference: 'Bài tập thực hành 5: Kế thừa',
    unlocked: false,
    quest: 'Học viện muốn đào tạo Chiến binh, Pháp sư và Cung thủ, nhưng chẳng ai muốn chép lại lớp Character ba lần.',
    feature: 'Chọn nghề: Warrior, Mage, Archer; phe Hero và phe Monster.',
  },
  {
    slug: 'tuan-06',
    week: 6,
    region: 'Đấu Trường Đa Hình',
    icon: 'arena',
    concept: 'Đa hình, up/down-casting, lớp trừu tượng',
    reference: 'Bài tập thực hành 6: Đa hình',
    unlocked: false,
    quest: 'Đấu trường mở hội chiến 3v3, nhưng không có chiếc vector nào chứa được cả Warrior lẫn Mage.',
    feature: 'Đánh theo đội, xếp lượt theo Speed, quái vật có AI đơn giản.',
  },
  {
    slug: 'tuan-07',
    week: 7,
    region: 'Lò Rèn Toán Tử',
    icon: 'forge',
    concept: 'Nạp chồng toán tử',
    reference: 'Bài tập thực hành 7: Nạp chồng toán tử',
    unlocked: false,
    quest: 'Người thợ rèn mệt mỏi vì phải cộng từng chỉ số của thanh kiếm vào nhân vật bằng tay.',
    feature: 'Trang bị, rơi đồ và lên cấp: hero += sword;',
  },
  {
    slug: 'tuan-08',
    week: 8,
    region: 'Thư Viện Cổ',
    icon: 'library',
    concept: 'File và stream',
    reference: 'Bài tập thực hành 8: File và stream',
    unlocked: false,
    quest: 'Mỗi lần tắt chương trình, cả đội anh hùng biến mất không dấu vết.',
    feature: 'Lưu và tải game, quái vật đọc từ file, ghi nhật ký trận đấu để vẽ biểu đồ.',
  },
  {
    slug: 'tong-ket',
    week: null,
    region: 'Đại Hội Võ Lâm',
    icon: 'trophy',
    concept: 'Tổng kết: giải đấu giữa các nhóm',
    unlocked: false,
    quest: 'Mỗi nhóm cử một nghề do chính mình thiết kế vào đấu trường. Chỉ một nhóm đứng trên đỉnh.',
    feature: 'Giải đấu vòng tròn giữa các lớp nhân vật do sinh viên viết.',
  },
]

export const findWeek = (slug: string) => weeks.find((w) => w.slug === slug)

// Vùng đang học = vùng mở khóa cuối cùng
export const currentSlug = [...weeks].reverse().find((w) => w.unlocked)?.slug
