#include <bits/stdc++.h>
using namespace std;

int Move(char arr[3][3], int row, int col, int count, char element, char ch)
{
    if (count == 4)
        return 0;
    else
    {
        // validated
        int val;
        row = row % 3, col = col % 3;

        if (arr[row][col] != element)
            return 0;
        else
        {
            if (ch == 'U')
                val = Move(arr, row - 1, col + 1, count + 1, element, 'U');
            else if (ch == 'r')
                val = Move(arr, row, col + 1, count + 1, element, 'r');
            else if (ch == 'd')
                val = Move(arr, row + 1, col, count + 1, element, 'd');
            else
                val = Move(arr, row + 1, col + 1, count + 1, element, 'D');
            return val + 1;
        }
    }
}

char Tic_Tac_Toe(char arr[3][3], int row, int col, char element)
{
    int count = 1, val;
    char ch = 'N';
    bool check = true;

    if (row == col)
    {
        val = Move(arr, row + 1, col + 1, count + 1, element, 'D'); // Lower Diagonal
        if (val == 2)
            return 't';
        else if (check && val == 1)
        {
            ch = 'D';
            check = false;
        }
    }

    if (row - col == 2 || col - row == 2 || (row == col && row == 1))
    {

        val = Move(arr, row - 1, col + 1, count + 1, element, 'U'); // Upper Diagonal
        if (val == 2)
            return 't';
        else if (check && val == 1)
        {
            ch = 'U';
            check = false;
        }
    }

    val = Move(arr, row, col + 1, count + 1, element, 'r'); // Right
    if (val == 2)
        return 't';
    else if (check && val == 1)
    {
        ch = 'r';
        check = false;
    }

    val = Move(arr, row + 1, col, count + 1, element, 'd'); // Down
    if (val == 2)
        return 't';
    else if (check && val == 1)
    {
        ch = 'd';
        check = false;
    }

    return ch;
}

int main()
{
    char Arr[3][3] = {
        {'_', '_', '_'},
        {'_', '_', '_'},
        {'_', '_', '_'}};

    int counter = 1;
    bool comp = false;

    cout << "\n\n~ Welcome to the arena of Tic Tac Toe! ~\n"
         << endl;
    cout << "Who will start at first? \ntype U for Your turn!\ntype C for Computer's turn!" << endl;
    char start;
    cin >> start;

    if (start == 'C' || start == 'c')
        comp = true;

    cout << "\nWhat you will choose?\n'X' or '0'\n";
    char user_ch, comp_ch;
    cin >> user_ch;
    cout << endl;

    if (user_ch == 'X' || user_ch == 'x')
        comp_ch = '0', user_ch = 'X';
    else
        comp_ch = 'X';

    bool activate = false;

    while (counter < 10)
    {

        int row, col, val;
        char current_char, miscalleneous;
        int row_m, col_m;

        if (comp) // Computer Section
        {
            // computer will play the turn!
            cout << "Computer's turn" << endl;
            bool repeat = true;
            while (repeat)
            {

                if (activate)
                {
                    activate = false;
                    if (miscalleneous == 'U')
                        row_m = row_m - 2, col_m = col_m + 2;

                    else if (miscalleneous == 'r')
                        col_m = col_m + 2;

                    else if (miscalleneous == 'd')
                        row_m = row_m + 2;

                    else
                        row_m += 2, col_m += 2;

                    row_m = row_m % 3, col_m = col_m % 3;
                    val = row_m * 3 + col_m;
                }
                else
                {
                    srand(time(0));
                    val = rand() % 10;
                }
                row = val / 3, col = val % 3;
                if (Arr[row][col] == '_')
                {
                    Arr[row][col] = comp_ch;
                    repeat = false;
                    cout << "Computer typed: " << val << endl
                         << endl;
                }
            }
            current_char = comp_ch;
            comp = false;
        }

        else // User Section
        {
            cout << "User's turn!" << endl;
            cout << "Enter a valid position between 0-8" << endl;
            cin >> val;
            if (val < 0 || val > 8)
            {
                cout << "\nInvalid Number Entered\n Please try again!" << endl;
                counter--;
                continue;
            }
            else if (Arr[val / 3][val % 3] != '_')
            {
                cout << "Position is not vacant\n Please try again!" << endl;
                counter--;
                continue;
            }

            cout << endl;
            row = val / 3, col = val % 3;
            Arr[row][col] = user_ch;
            comp = true;
            current_char = user_ch;
        }

        // print
        for (int i = 0; i < 3; i++)
        {
            cout<<"| ";
            for (int j = 0; j < 3; j++)
            {
                cout << Arr[i][j] << " ";
            }
            cout << "|" << endl;
        }
    
        char ch = Tic_Tac_Toe(Arr, row, col, current_char);
        if (ch == 't')
        {
            if (current_char == user_ch)
            {
                cout << "User won" << endl;
            }
            else
            {
                cout << "Computer won" << endl;
                cout << "Well Played, try again!" << endl;
            }
            return 0;
        }
        else if (!comp && ch != 'N')
        {
            miscalleneous = ch;
            activate = true;
            row_m = row, col_m = col;
        }

        counter++;
    }

    cout << "Match Tied" << endl;
    cout << "This is the end" << endl;
    return 0;
}