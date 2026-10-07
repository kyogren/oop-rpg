// Tuần 3 - Lớp và đối tượng
// Nhân vật đầu tiên: mọi thuộc tính và phương thức đều public.
#include <iostream>
using namespace std;

class Character
{
public:
    double HP, PAtk, Speed;

    void SetInformation()
    {
        cin >> HP >> PAtk >> Speed;
    }

    // Truyền tham chiếu (&) để trừ máu trên chính đối tượng bị đánh,
    // không phải trên một bản sao của nó.
    void Attack(Character &target)
    {
        target.HP -= PAtk;
    }
};

int main()
{
    Character human, dragon;
    cout << "Nhap chi so human (HP PAtk Speed): ";
    human.SetInformation();
    cout << "Nhap chi so dragon (HP PAtk Speed): ";
    dragon.SetInformation();

    if (dragon.Speed > human.Speed)
    {
        while (true)
        {
            dragon.Attack(human);
            cout << "Mau nguoi: " << human.HP << endl;
            if (human.HP <= 0)
            {
                cout << "Rong thang!" << endl;
                break;
            }
            human.Attack(dragon);
            cout << "Mau rong: " << dragon.HP << endl;
            if (dragon.HP <= 0)
            {
                cout << "Nguoi thang!" << endl;
                break;
            }
        }
    }
    else
    {
        while (true)
        {
            human.Attack(dragon);
            cout << "Mau rong: " << dragon.HP << endl;
            if (dragon.HP <= 0)
            {
                cout << "Nguoi thang!" << endl;
                break;
            }
            dragon.Attack(human);
            cout << "Mau nguoi: " << human.HP << endl;
            if (human.HP <= 0)
            {
                cout << "Rong thang!" << endl;
                break;
            }
        }
    }
    return 0;
}
