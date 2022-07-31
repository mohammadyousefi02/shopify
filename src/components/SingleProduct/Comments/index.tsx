import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useAuthUserToken from "../../../../hooks/useAuthUserToken";
import Button from "../../Button";
import Input from "../../Input";
import { Icomment } from "../../../../interfaces/productInterface";
import { toast } from "react-toastify";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { server } from "../../../../config/server";

interface Props {
  id: string;
}

function Comments({ id }: Props) {
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<Icomment[]>([]);
  const [token] = useAuthUserToken();
  const router = useRouter();

  const getComments = async () => {
    const res = await axios.get(`${server}/api/products/${id}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  const addComment = async () => {
    if (token) {
      if (!name || !comment) {
        toast.error("همه فیلد ها را پر کنید");
      } else {
        try {
          await axios.post(
            `${server}/api/products/${id}/comments`,
            { name, comment },
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          setComment("");
          setName("");
          getComments();
        } catch (error) {
          toast.error("خطایی رخ داده است");
        }
      }
    } else {
      router.push("/profile");
    }
  };
  return (
    <div className="flex flex-col gap-2" id="comments">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        <span>دیدگاه کاربران</span>
        <div className="flex flex-col gap-4 items-start">
          <div>
            <Input
              placeholder="نام شما"
              background="transparent"
              className="border  w-[500px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <textarea
            cols={30}
            rows={5}
            placeholder="متن دیدگاه..."
            className="w-full border rounded-[12px] resize-none p-2  outline-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button
            title="ارسال نظر"
            color="pink"
            className="self-center  w-[200px]"
            onClick={addComment}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <div
            key={comment._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <div className="flex gap-2 items-center">
              <span>{comment.name}</span>
              <span className="text-xs">
                {new DateObject({
                  date: comment.date,
                  calendar: persian,
                  locale: persian_fa,
                }).format()}
              </span>
            </div>
            <div>
              <p className="leading-7">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
