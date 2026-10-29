import { cacheLife, cacheTag } from "next/cache";
import type { QueryParams } from "next-sanity";
import { client } from "./client";

type QueryResult<Q extends string> = Q extends keyof SanityQueries ? SanityQueries[Q] : unknown;

// Published content, cached by Next.js. Revalidate early with revalidateTag("sanity").
export async function sanityFetch<const Q extends string>(
  query: Q,
  params: QueryParams = {},
): Promise<QueryResult<Q>> {
  "use cache";
  cacheLife("minutes");
  cacheTag("sanity");
  return client.fetch<QueryResult<Q>>(query, params);
}
