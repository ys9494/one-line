import { AdminContainer, AdminBox, AdminItem, AdminName } from './Admin-styled';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faNoteSticky } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  return (
    <AdminContainer>
      <AdminBox>
        <Link href={'/admin-user'}>
          <AdminItem>
            <FontAwesomeIcon icon={faUserGroup} size="lg" />
          </AdminItem>
          <AdminName>회원 관리</AdminName>
        </Link>
        <Link href={'/admin-posts'}>
          <AdminItem>
            <FontAwesomeIcon icon={faNoteSticky} size="xs" />
          </AdminItem>
          <AdminName>게시글 관리</AdminName>
        </Link>
      </AdminBox>
    </AdminContainer>
  );
};

export default Admin;
