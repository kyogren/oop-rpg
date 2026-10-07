### Lớp là khuôn, đối tượng là bánh

Trước đây, muốn có hai nhân vật ta phải khai báo các biến rời rạc:

```cpp
double hpHuman, atkHuman, speedHuman;
double hpDragon, atkDragon, speedDragon;
```

Thêm nhân vật thứ ba là thêm ba biến nữa. **Lớp** (`class`) gom dữ liệu và hành động của một loại đối tượng vào một chỗ. Mỗi **đối tượng** tạo ra từ lớp có bộ dữ liệu riêng:

```cpp
Character human, dragon;   // hai đối tượng, mỗi đối tượng có HP, PAtk, Speed riêng
human.HP = 100;            // truy cập thuộc tính bằng dấu chấm
```

### Thuộc tính và phương thức

- **Thuộc tính** (attribute): dữ liệu mô tả đối tượng, ví dụ `HP`, `PAtk`, `Speed`.
- **Phương thức** (method): hành động của đối tượng, ví dụ `SetInformation()`, `Attack()`.

Bên trong phương thức, tên thuộc tính tự hiểu là thuộc tính của **chính đối tượng đang gọi**: `human.Attack(dragon)` dùng `PAtk` của `human`.

### Vì sao `Attack` cần dấu `&`?

```cpp
void Attack(Character &target) { target.HP -= PAtk; }
```

Nếu viết `Character target` (không có `&`), phương thức nhận một **bản sao** của con rồng. Máu bị trừ trên bản sao, còn con rồng thật vẫn nguyên vẹn. Tham chiếu `&` giúp phương thức thao tác trên đúng đối tượng được truyền vào.

### Điều còn khiến ta băn khoăn

Mọi thứ đều `public`, nên bất kỳ dòng nào trong `main()` cũng sửa được chỉ số nhân vật. Vòng lặp trận đấu cũng bị viết lặp lại hai lần. Tuần sau ta sẽ xử lý cả hai vấn đề này.
