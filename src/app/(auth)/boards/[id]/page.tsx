import Board from "@/components/Board";
import { fetchBoard } from "@/lib/utils";

type BoardPageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: BoardPageProps) => {
  const board = await fetchBoard(params.id);

  return <Board board={board} />;
};

export default page;
