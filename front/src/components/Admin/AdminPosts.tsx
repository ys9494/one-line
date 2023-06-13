import { useState, useEffect } from 'react';
import {
  AdminContainer,
  Title,
  PostContainer,
  UserTable,
  TableHead,
  TableRow,
  TableCell,
} from './Admin-styled';
import * as API from '@/utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const Admin = (props: any) => {
  const router = useRouter();
  const [postData, setpostData] = useState<any[]>([]);

  const postFirstRender = async () => {
    const res: any = await API.get('/admin/posts');
    setpostData(res.data.data.posts);
  };

  useEffect(() => {
    postFirstRender();
  }, []);

  const handleDelete = async (postId: string) => {
    const res = await API.delete(`/admin/posts/${postId}`);
    postFirstRender();
  };

  const postList = postData.map(item => {
    return (
      <TableRow key={item.id}>
        <TableCell width="25%">{item.title}</TableCell>
        <TableCell width="40%">{item.content}</TableCell>
        <TableCell width="20%">
          {item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 19)}
        </TableCell>
        <TableCell width="15%">
          <button
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            삭제
          </button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <AdminContainer>
      <PostContainer>
        <Title>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: '#000', width: '25px', cursor: 'pointer' }}
            onClick={() => router.back()}
          />
          <span>전체 게시글 조회</span>
        </Title>
        <UserTable>
          <TableHead>
            <TableCell width="25%">게시물 제목</TableCell>
            <TableCell width="40%">게시물 내용</TableCell>
            <TableCell width="20%">작성일자</TableCell>
            <TableCell width="15%">게시물 삭제</TableCell>
          </TableHead>
          {postList}
        </UserTable>
      </PostContainer>
    </AdminContainer>
  );
};

export default Admin;
