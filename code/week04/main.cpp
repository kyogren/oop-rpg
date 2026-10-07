// Tuần 4 - Phạm vi truy cập, constructor, destructor
// Nhân vật "an toàn": chỉ số là private, chỉ được thay đổi qua phương thức có kiểm tra.
#include <iostream>
#include <string>
using namespace std;

class Character
{
private:
    string name;
    double HP, maxHP, PAtk, Def, Speed;

public:
    // Constructor mặc định: dùng khi khai báo "Character c;"
    Character()
    {
        name = "Unknown";
        HP = maxHP = 100;
        PAtk = 10;
        Def = 0;
        Speed = 5;
    }

    // Constructor có tham số: khởi tạo nhân vật ngay khi khai báo
    Character(string name, double HP, double PAtk, double Def, double Speed)
    {
        // Gán giá trị mặc định trước, sau đó mới kiểm tra và ghi đè qua setter
        this->name = "Unknown";
        this->HP = maxHP = 100;
        this->PAtk = 10;
        this->Def = 0;
        this->Speed = 5;
        SetInformation(name, HP, PAtk, Def, Speed);
    }

    // Destructor: tự động được gọi khi đối tượng bị hủy
    ~Character()
    {
        cout << "[" << name << " roi khoi tran dau]" << endl;
    }

    // Setter có kiểm tra: dữ liệu không hợp lệ sẽ bị từ chối
    bool SetInformation(string name, double HP, double PAtk, double Def, double Speed)
    {
        if (HP <= 0 || PAtk < 0 || Def < 0 || Speed <= 0)
        {
            cout << "Chi so khong hop le cho " << name << ", giu nguyen chi so cu." << endl;
            return false;
        }
        this->name = name;
        this->HP = this->maxHP = HP;
        this->PAtk = PAtk;
        this->Def = Def;
        this->Speed = Speed;
        return true;
    }

    // Getter chỉ đọc (const): không được phép thay đổi đối tượng
    string GetName() const { return name; }
    double GetHP() const { return HP; }
    double GetSpeed() const { return Speed; }
    bool IsAlive() const { return HP > 0; }

    // Nhận sát thương: phòng thủ giảm sát thương, tối thiểu 1, HP không âm
    double TakeDamage(double rawDamage)
    {
        double damage = rawDamage - Def;
        if (damage < 1) damage = 1;
        HP -= damage;
        if (HP < 0) HP = 0;
        return damage;
    }

    double Attack(Character &target)
    {
        return target.TakeDamage(PAtk);
    }

    void PrintInfo() const
    {
        cout << name << " | HP " << HP << "/" << maxHP << " | PAtk " << PAtk
             << " | Def " << Def << " | Speed " << Speed << endl;
    }
};

// Chỉ còn MỘT vòng lặp: con trỏ attacker/defender đổi vai sau mỗi lượt
void Battle(Character &a, Character &b)
{
    Character *attacker = &a, *defender = &b;
    if (b.GetSpeed() > a.GetSpeed()) swap(attacker, defender);

    while (true)
    {
        double damage = attacker->Attack(*defender);
        cout << attacker->GetName() << " danh " << defender->GetName() << " " << damage
             << " sat thuong, " << defender->GetName() << " con " << defender->GetHP() << " HP" << endl;
        if (!defender->IsAlive())
        {
            cout << attacker->GetName() << " thang!" << endl;
            return;
        }
        swap(attacker, defender);
    }
}

int main()
{
    Character hero("Hero", 100, 20, 5, 10);
    Character dragon("Dragon", 150, 25, 8, 7);
    // hero.HP = -999;   // Lỗi biên dịch: HP là private, không thể "hack" nữa!

    hero.PrintInfo();
    dragon.PrintInfo();
    Battle(hero, dragon);

    {
        Character slime;  // Gọi constructor mặc định
        slime.PrintInfo();
    }   // slime ra khỏi phạm vi tại đây -> destructor được gọi

    cout << "Ket thuc main" << endl;
    return 0;   // hero và dragon bị hủy sau dòng này
}
