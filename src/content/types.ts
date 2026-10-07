// Đánh dấu thay đổi so với tuần trước, dùng để tô màu trong sơ đồ lớp
export type Change = 'new' | 'changed'

export interface Member {
  vis: '+' | '-' | '#'
  text: string
  change?: Change
}

export interface ClassSpec {
  name: string
  change?: Change
  attributes: Member[]
  methods: Member[]
}

export interface Exercise {
  title: string
  description: string
  url?: string           // link Moodle, để trống nếu chưa có
  boss?: boolean         // thử thách nâng cao, không bắt buộc
}

export type RegionIcon = 'village' | 'castle' | 'academy' | 'arena' | 'forge' | 'library' | 'trophy'

export interface Week {
  slug: string           // dùng trong URL: #/tuan/<slug>
  week: number | null    // null cho buổi tổng kết
  region: string
  icon: RegionIcon
  concept: string        // kiến thức OOP của tuần
  reference?: string     // tên file PDF bài tập thực hành
  unlocked: boolean      // true = hiện trên bản đồ, vào được
  quest: string          // "chỗ đau" kể theo kiểu nhiệm vụ trong game
  feature: string        // tính năng game mới của tuần
  classes?: ClassSpec[]
  starterCode?: string   // đường dẫn trong thư mục code/, ví dụ 'week03/main.cpp'
  solutionCode?: string
  solutionReleased?: boolean
  exercises?: Exercise[]
}
