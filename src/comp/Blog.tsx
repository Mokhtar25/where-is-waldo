export interface BlogItem {
  url: string;
  id: string;
  title: string;
  likes: number;
  author: string;
}

interface BlogProps {
  blogItem: BlogItem;
  handelLike: (e: BlogItem) => void;
}

export default function Blog({ blogItem, handelLike }: BlogProps) {
  return (
    <div className="flex size-60 flex-col justify-center gap-4 border-2 border-white">
      <h2>{blogItem.title}</h2>
      <span>{blogItem.author}</span>
      <span></span>

      <span>{blogItem.url}</span>

      <span>{blogItem.likes}</span>
      <button onClick={() => handelLike(blogItem)}>Like +</button>
    </div>
  );
}
