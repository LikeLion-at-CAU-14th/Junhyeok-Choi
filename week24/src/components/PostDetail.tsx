import styled from 'styled-components';
import type { Post } from '../types/post';

interface PostDetailProps {
  post?: Post; //상세 주소로 받아온 게시글 데이터

  // [과제2] 상세 조회 query에서 받은 로딩/에러 상태 타입 작성하기
  isPending: boolean;
  isError: boolean;

  // 삭제 버튼을 눌렀을 때 실행할 함수.
  // 부모 컴포넌트에서 delete mutation을 실행하도록 연결.
  onDelete: () => void;
}

export default function PostDetail({
  post,
  isPending,
  isError,
  onDelete,
}: PostDetailProps) {
  // 상세 게시글을 불러오는 중일 때 보여줄 화면
  if (isPending) {
    return <Box>게시글을 불러오는 중입니다...</Box>;
  }

  // 상세 게시글 조회에 실패했을 때 보여줄 화면
  if (isError) {
    return <Box>게시글을 불러오지 못했습니다.</Box>;
  }

  if (!post) {
    return <Box>게시글을 선택해보세요.</Box>;
  }

  return (
    <Box>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <DeleteButton onClick={onDelete}>삭제</DeleteButton>
    </Box>
  );
}

const Box = styled.section`
  padding: 24px;
  border: 1px solid #ededed;
  border-radius: 10px;
  background: #ffffff;
`;

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 24px;
`;

const Content = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.7;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button`
  margin-top: 20px;
  padding: 10px 14px;
  border: 1px solid #d33;
  border-radius: 8px;
  background: white;
  color: #d33;
  cursor: pointer;

  &:hover {
    background: #d33;
    color: white;
  }
`;