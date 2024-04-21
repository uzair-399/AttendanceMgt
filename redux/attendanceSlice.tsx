import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {dummyData} from './dummyData';

interface Student {
  name: string;
  class: number;
  headOf?: number;
}

interface Teacher {
  name: string;
  headOf?: number;
  class?: number;
}

interface AttendanceState {
  attendance: (Student | Teacher)[];
  role: string;
  name: string;
  email: string;
  headOf?: number;
  password: string | null;
}

const initialState: AttendanceState = {
  attendance: [],
  role: '',
  name: '',
  email: '',
  password: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    emailInputHandler: (state, action) => {
      state.email = action.payload;
    },
    passwordInputHandler: (state, action) => {
      state.password = action.payload;
    },
    loginHandler: (state, action) => {
      const {navigation} = action.payload;
      if (state.role === 'Staff') {
        const teacher = dummyData.teachers.find(
          teacher =>
            teacher.email === state.email &&
            teacher.password === state.password,
        );
        if (teacher) {
          console.log('logged in as Staff :', teacher.name);
          state.name = teacher.name;

          navigation.navigate('Staff');
        } else {
          console.log('Staff login failed');
        }
      } else if (state.role === 'Admin') {
        const admin = dummyData.teachers.find(
          teacher =>
            teacher.email === state.email &&
            teacher.password === state.password &&
            teacher.admin === true,
        );
        if (admin) {
          console.log('logged in as Admin :', admin.name);
          navigation.navigate('Admin');
          state.name = admin.name;
        } else {
          console.log('Admin login failed');
        }
      } else {
        console.log('Please Select a Role');
      }
    },
    presentHandler: (state, action) => {
      const studentName = action.payload;
      const presentStudent = dummyData.students.find(
        student => student.name === studentName,
      );
      if (presentStudent) {
        const present = {
          name: presentStudent.name,
          class: presentStudent.class,
          present: 'present',
        };
        const isAlreadyPresent = state.attendance.some(
          student =>
            student.name === present.name && student.class === present.class,
        );
        if (isAlreadyPresent) {
          Alert.alert('Already marked as present');
        } else {
          state.attendance.push(present);
        }
      }
      console.log(state.attendance);
    },
    teacherPresentHandler: (state, action: PayloadAction<string>) => {
      const teacherName = action.payload;
      const presentTeacher = dummyData.teachers.find(
        teacher => teacher.name === teacherName,
      );
      if (presentTeacher) {
        const present = {
          name: presentTeacher.name,
          headOf: presentTeacher.headOf,
          present: 'present',
        };
        const isAlreadyPresent = state.attendance.some(
          teacher =>
            teacher.name === present.name && teacher.headOf === present.headOf,
        );
        if (isAlreadyPresent) {
          Alert.alert('Already marked as present');
        } else {
          state.attendance.push(present);
        }
      }
      console.log(state.attendance);
    },
    bulkPresentHandler: (state, action) => {
      const classToMarkPresent = action.payload;
      const presentStudents = dummyData.students.filter(
        student => student.class === classToMarkPresent,
      );

      if (presentStudents.length > 0) {
        // Filter out already present students from presentStudents
        const filteredPresentStudents = presentStudents.filter(student =>
          state.attendance.every(
            attStudent =>
              attStudent.name !== student.name ||
              attStudent.class !== student.class,
          ),
        );

        if (filteredPresentStudents.length === 0) {
          Alert.alert('All students are already marked as present');
        } else {
          const newAttendance = filteredPresentStudents.map(student => ({
            name: student.name,
            class: student.class,
            present: 'present',
          }));

          // Update the attendance array with new data
          const updatedAttendance = [...state.attendance, ...newAttendance];
          console.log('Updated attendance:', updatedAttendance); // Log the updated attendance array
          return {
            ...state,
            attendance: updatedAttendance,
          };
        }
      } else {
        Alert.alert('No students found for the given class');
      }
    },
  },
});

export const {
  setRole,
  passwordInputHandler,
  emailInputHandler,
  loginHandler,
  presentHandler,
  teacherPresentHandler,
  bulkPresentHandler,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
