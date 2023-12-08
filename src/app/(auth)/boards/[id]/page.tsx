import Board from "@/components/Board";
import { fetchBoard } from "@/lib/utils";
import Image from "next/image";

type BoardPageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: BoardPageProps) => {
  const board = await fetchBoard(params.id);

  return (
    <>
      <Board board={board} />
    </>
  );
};

export default page;
