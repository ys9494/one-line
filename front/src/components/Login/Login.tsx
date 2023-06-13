import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  LoginFormContainer,
  Form,
  LoginTitle,
  InputWrapper,
  InputTitle,
  Input,
  Button,
} from './login-styled';
import { signInWithEmailAndPassword, getIdToken, signOut } from 'firebase/auth';
import auth from '../common/auth';
import * as API from '@/utils/api';

type LoginType = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log({ email, password });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      // console.log('token', idToken);
      const response = await API.post<LoginType>(
        '/auth/login',
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      // console.log('Sent request headers:', response.config.headers);
      // console.log('response:', response.data);

      if (response.status === 200) {
        // 백엔드 검증 성공
        // 로그인 처리 및 다음 페이지로 이동
        router.push('/');
      } else {
        // 백엔드 검증 실패
        // 로그인 실패 처리 및 오류 메시지 표시
        await signOut(auth); // Firebase에서 로그아웃
        // console.error('로그인 실패: ');
        alert('이메일 주소 혹은 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error);
      await signOut(auth); // Firebase에서 로그아웃
      alert('이메일 주소 혹은 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <LoginFormContainer>
      <Form onSubmit={handleSubmit}>
        <LoginTitle>로그인</LoginTitle>
        <InputWrapper>
          <InputTitle>이메일</InputTitle>
          <Input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
          <InputTitle>비밀번호</InputTitle>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="●●●●●●●"
          />
        </InputWrapper>
        <Button type="submit">Login</Button>
      </Form>
    </LoginFormContainer>
  );
};

export default Login;
