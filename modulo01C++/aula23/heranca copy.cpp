#include <iostream>

using namespace std;

class Gen {
    private:
        int x;
    protected:
        int y;
    public:
        int z;
};

class Esp: protected Gen {

};


class Esp2: Esp {
    void func() {
        z = 1;
        y = 2;
    }
};

int main()
{
    Esp2::func();
    return 0;
}
