import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {dummyData} from '../redux/dummyData';
import {RootState} from '../redux/store'; // Assuming you have a store setup with RootState

import {
  bulkPresentHandler,
  presentHandler,
  teacherPresentHandler,
} from '../redux/attendanceSlice';
interface Props {
  // Define props here
  name: string;
  class?: number;
  headOf?: number;
  navigation?: any;
}

const StaffScreen: React.FC<Props> = ({
  navigation,
  /* destructure props here */
}) => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.attendance.name);
  const filteredStudents = dummyData.students.filter(student => {
    const teacher = dummyData.teachers.find(teacher => teacher.name === name);
    return teacher && student.class === teacher?.headOf;
  });
  const handlePresent = (studentName: string) => {
    dispatch(presentHandler(studentName));
  };

  return (
    <View style={{marginHorizontal: 10}}>
      <Text style={{textAlign: 'center', fontSize: 16}}>
        Logged in as : {name}
      </Text>
      <Button
        title="Punch Attendance"
        onPress={() => dispatch(teacherPresentHandler(name))}
      />
      {filteredStudents.length > 0 && (
        <Text style={{fontSize: 20, fontWeight: '600', marginVertical: 10}}>
          Students:
        </Text>
      )}
      {filteredStudents.map(student => (
        <View
          key={student.name}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginVertical: 2,
          }}>
          <Text>{student.name}</Text>
          <Button title="Present" onPress={() => handlePresent(student.name)} />
        </View>
      ))}
      {filteredStudents.length > 0 && (
        <Button
          title="Mark Bulk Attendance"
          onPress={() =>
            dispatch(bulkPresentHandler(filteredStudents[0].class))
          }
        />
      )}

      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default StaffScreen;
