import type { Post } from '../types/post';

const STORAGE_KEY = 'mini-board-posts';

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'TanStack Query 시작하기',
    content: '서버 상태를 더 편하게 관리할 수 있습니다.',
  },
  {
    id: 2,
    title: 'queryKey란?',
    content: 'queryKey는 캐시된 데이터를 구분하는 이름표입니다.',
  },
  {
    id: 3,
    title: 'Mutation이란?',
    content: '서버 데이터를 추가, 수정, 삭제할 때 사용합니다.',
  },
];

interface AddPostInput {
  title: string;
  content: string;
}

const loadPosts = (): Post[] => {
  const savedPosts = localStorage.getItem(STORAGE_KEY);

  if (!savedPosts) {
    return initialPosts;
  }

  return JSON.parse(savedPosts);
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

let posts: Post[] = loadPosts();

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// [실습] 게시글 목록을 가져오는 조회 함수.
// TanStack Query의 useQuery에서 queryFn으로 연결할 함수.
export async function getPosts(): Promise<Post[]> {
  await delay(500);
  return posts;
}

// [과제] 게시글 id를 받아서 특정 게시글 하나만 찾는 함수
// 상세 페이지 또는 상세 영역에서 선택된 게시글 정보를 보여줄 때 사용
export async function getPost(id: number): Promise<Post> {
  await delay(300);

  const post = posts.find((post) => post.id === id);

  // 게시글이 없으면 에러를 던져서 useQuery의 isError 상태로 처리
  if (!post) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }

  return post;
}

// [실습] 제목과 내용을 받아 새 게시글을 추가하는 함수.
// useMutation의 mutationFn으로 연결할 함수.
export async function addPost({ title, content }: AddPostInput): Promise<Post> {
  await delay(300);

  const newPost: Post = {
    id: Date.now(),
    title,
    content,
  };

  posts = [newPost, ...posts];
  savePosts(posts);

  return newPost;
}

// [과제] id를 받아 해당 게시글을 삭제하는 함수.
// 삭제 성공 후에는 게시글 목록을 다시 최신화해야 함.
export async function deletePost(id: number): Promise<void> {
  await delay(300);

  posts = posts.filter((post) => post.id !== id);
  savePosts(posts);
}
