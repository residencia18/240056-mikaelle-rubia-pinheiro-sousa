#include <iostream>

using namespace std;

class Gen {
    private:
        int x;
    protected:
        int y;
    public:
        int z;
}

class Esp: private Gen {

};


class Esp2: Esp {
    void func() {
        z = 1;
        y = 2;

        cout << "z: " << z << " y: " << y << endl;
    }
}

int main()
{
    Esp2::func();
    return 0;
}
