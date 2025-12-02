#include <iostream>
#include <vector>

using namespace std;

int calculateTotalTime (int subjects, vector <int> time){

    int ans = 0;
    for (int i = 0; i < subjects; i++){
        ans += time[i];
    }

    return ans;
}

void friendlyFeedback (int time){

    if (time > 240){
        cout << endl << "That does not look very manageable... :(" << endl;
    } else {
        cout << endl << "Congratulations, this plan looks manageable!! :)" << endl;
    }
}

int main () {

    //Task B1: Basic input, variables, and output

    cout << endl << "How many subjects would you like to study today?" << endl;

    int numberOfSubjects;
    cin >> numberOfSubjects;


    vector <string> subjectName(numberOfSubjects);
    vector <int> subjectMinutes(numberOfSubjects);


    for (int i = 0; i < numberOfSubjects; i++){

        cout << endl << "How would you like to name subject " << i + 1 << "?" << endl;
        cin >> subjectName[i];

        cout << endl << "How much time (in minutes) do you plan to spend studying " << subjectName[i] << "?" << endl;
        cin >> subjectMinutes[i];

        // this block of code has the purpose of improving UX by stating that the user's input is invalid and getting a new input. 
        if (subjectMinutes[i] <= 0){ 
            while (subjectMinutes[i] <= 0){ 
                cout << "Your input is invalid. Maybe there was a typo? Please try again." << endl; 
                cout << endl << "How much time (in minutes) do you plan to spend studying " << subjectName[i] << "?" << endl; 
                cin >> subjectMinutes[i]; 
            } 
        }
    }

    int totalStudyTime = calculateTotalTime(numberOfSubjects, subjectMinutes);

    friendlyFeedback(totalStudyTime);

    cout << endl << "Overview:" << endl;
    cout << "Number of subjects: " << numberOfSubjects << endl;
    cout << "Study time: " << totalStudyTime << endl;
    cout << "Average study time per subject: " << totalStudyTime/numberOfSubjects << endl;
}