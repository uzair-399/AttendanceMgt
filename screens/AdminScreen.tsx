import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {dummyData} from '../redux/dummyData';
import {RootState} from '../redux/store';

interface Props {
  navigation: any;
}

interface Teacher {
  name: string;
}

interface Student {
  name: string;
  class: number;
}

const AdminScreen: React.FC<Props> = ({navigation}) => {
  const attendance: Teacher[] = useSelector(
    (state: RootState) => state.attendance.attendance,
  );

  const dummyDataTeachers: Teacher[] = dummyData.teachers;
  const dummyDataStudents: Student[] = dummyData.students;

  const presentTeachers = dummyDataTeachers.filter(teacher =>
    attendance.some(att => att.name === teacher.name),
  );
  const absentTeachers = dummyDataTeachers.filter(
    teacher => !attendance.some(abs => abs.name === teacher.name),
  );

  const class9Students = dummyDataStudents.filter(
    student => student.class === 9,
  );
  const class10Students = dummyDataStudents.filter(
    student => student.class === 10,
  );

  const presentStudents9 = class9Students.filter(student =>
    attendance.some(att => att.name === student.name),
  );
  const absentStudents9 = class9Students.filter(
    student => !attendance.some(att => att.name === student.name),
  );

  const presentStudents10 = class10Students.filter(student =>
    attendance.some(att => att.name === student.name),
  );
  const absentStudents10 = class10Students.filter(
    student => !attendance.some(att => att.name === student.name),
  );
  return (
    <View style={{marginHorizontal: 10}}>
      <Text style={{fontSize: 20, fontWeight: '600'}}>
        Teachers Attendance:
      </Text>
      {presentTeachers.map(teacher => (
        <View
          key={teacher.name}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{teacher.name}</Text>
          <Text>Present</Text>
        </View>
      ))}
      {absentTeachers.map(teacher => (
        <View
          key={teacher.name}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{teacher.name}</Text>
          <Text>Absent</Text>
        </View>
      ))}

      <Text style={{fontSize: 20, fontWeight: '600'}}>
        Students Attendance:
      </Text>

      <Text style={{fontSize: 20, fontWeight: '600'}}>Class: 9</Text>
      {presentStudents9.map(student => (
        <View
          key={student.name}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{student.name}</Text>
          <Text>Present</Text>
        </View>
      ))}
      {absentStudents9.map(student => (
        <View
          key={student.name}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{student.name}</Text>
          <Text>Absent</Text>
        </View>
      ))}
      <Text style={{fontSize: 20, fontWeight: '600'}}>Class: 10</Text>
      {presentStudents10.map(student => (
        <View
          key={student.name}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{student.name}</Text>
          <Text>Present</Text>
        </View>
      ))}
      {absentStudents10.map(student => (
        <View
          key={student.name}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{student.name}</Text>
          <Text>Absent</Text>
        </View>
      ))}
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')} // Corrected onPress handler
      />
    </View>
  );
};

export default AdminScreen;
