import { movies } from "@/data/movies";

// 실습 - Data Fetching
export async function GET() {
    return Response.json(movies);
}