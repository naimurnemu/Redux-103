import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useGetCommentsQuery, usePostCommentMutation } from '@/redux/features/product/productEndpoints';

const dummyComments = [
  'Bhalo na',
  'Ki shob ghori egula??',
  'Eta kono product holo ??',
  '200 taka dibo, hobe ??',
];

interface IProps {
  id: string;
}

interface IComment {
  id: string | number;
  productID: string | number;
  comment: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [postComment, { isLoading }] = usePostCommentMutation();
  const { data } = useGetCommentsQuery(id, { refetchOnMountOrArgChange: true });

  console.log(isLoading);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      productID: id,
      comment: inputValue,
    };
    postComment(data);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {data?.map((option: IComment) => (
          <div key={option?.id} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{option?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
