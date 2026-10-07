### `private`: tường thành bảo vệ dữ liệu

```cpp
class Character {
private:
    double HP;     // chỉ phương thức của Character mới đọc/ghi được
public:
    double GetHP() const { return HP; }
};

hero.HP = -999;    // lỗi biên dịch: 'double Character::HP' is private
```

Theo quy ước, **thuộc tính để `private`**, còn **phương thức để `public`**. Bên ngoài muốn đọc dữ liệu thì dùng getter, muốn ghi thì dùng setter.

### Setter là người gác cổng

Setter không chỉ gán giá trị, nó **kiểm tra** trước khi cho phép ghi:

```cpp
bool SetInformation(string name, double HP, double PAtk, double Def, double Speed) {
    if (HP <= 0 || PAtk < 0 || Def < 0 || Speed <= 0) return false;  // từ chối
    ...
}
```

Getter nên khai báo `const` để cam kết không làm thay đổi đối tượng.

### Constructor: sinh ra đã hợp lệ

Constructor là phương thức trùng tên lớp, không có kiểu trả về, được **tự động gọi khi tạo đối tượng**:

```cpp
Character slime;                              // constructor mặc định
Character hero("Hero", 100, 20, 5, 10);       // constructor có tham số
```

Nhờ constructor, không còn nhân vật nào "chưa có chỉ số" chứa giá trị rác.

### Destructor: lời chào tạm biệt

`~Character()` được gọi tự động khi đối tượng bị hủy. Đối tượng cục bộ bị hủy khi chương trình ra khỏi khối `{ }` chứa nó. Các đối tượng trong `main()` bị hủy **theo thứ tự ngược** với lúc tạo ra: chạy thử code sẽ thấy Dragon rời trận trước Hero.

### Một điều bất ngờ về `private`

```cpp
double Attack(Character &target) { return target.TakeDamage(PAtk); }
```

`private` giới hạn theo **lớp**, không theo đối tượng: phương thức của Character được phép đụng tới phần private của *một Character khác*. Dù vậy, ta vẫn để mục tiêu tự xử lý sát thương qua `TakeDamage`, vì phòng thủ là việc của bên bị đánh.

### Một vòng lặp cho mọi trận đấu

Thay vì viết hai nhánh `if/else` gần giống nhau, ta dùng hai con trỏ `attacker`, `defender` và đổi vai sau mỗi lượt bằng `swap`.
