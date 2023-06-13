import { useState, useEffect } from 'react';
import {
  AdminContainer,
  Title,
  UserContainer,
  UserTable,
  TableHead,
  TableRow,
  TableCell,
} from './Admin-styled';
import * as API from '@/utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const AdminUser = (props: any) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);

  const userFirstRender = async () => {
    const res: any = await API.get('/admin');
    setUserData(res.data.data.users);
  };

  useEffect(() => {
    userFirstRender();
  }, []);

  const handleSelectChange = async (e: any, index: any, id: any) => {
    const res = await API.patch(`admin/${id}`, { admin: e.target.value });
    userData[index].admin = e.target.value;
    setUserData(userData);
    userFirstRender();
  };

  const handleDelete = async (id: string) => {
    const res = await API.delete(`/admin/${id}`);
    userFirstRender();
  };

  const userList = userData.map((item, index: any) => {
    return (
      <TableRow key={item.id}>
        <TableCell width="10%">{item.nickname}</TableCell>
        <TableCell width="25%">{item.email}</TableCell>
        <TableCell width="20%">{item.blogName}</TableCell>
        <TableCell width="15%">
          <select
            onChange={e => {
              handleSelectChange(e, index, item.id);
            }}
            defaultValue={item.admin}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </TableCell>
        <TableCell width="15%">
          <button
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            회원탈퇴
          </button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <AdminContainer>
      <UserContainer>
        <Title>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: '#000', width: '25px', cursor: 'pointer' }}
            onClick={() => router.back()}
          />
          <span>전체 유저 조회</span>
        </Title>
        <UserTable>
          <TableHead>
            <TableCell width="10%">닉네임</TableCell>
            <TableCell width="25%">이메일</TableCell>
            <TableCell width="20%">블로그명</TableCell>
            <TableCell width="15%">관리자</TableCell>
            <TableCell width="15%">회원 탈퇴</TableCell>
          </TableHead>
          {userList}
        </UserTable>
      </UserContainer>
    </AdminContainer>
  );
};

export default AdminUser;
