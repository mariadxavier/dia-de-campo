import { NextResponse } from "next/server";

import type { PaginationMeta } from "@/src/types";

export function jsonOk<T>(data: T, meta?: PaginationMeta, status = 200) {
  return NextResponse.json(
    meta ? { data, meta } : { data },
    { status },
  );
}

export function jsonError(
  code: string,
  message: string,
  status = 400,
) {
  return NextResponse.json(
    { error: { code, message } },
    { status },
  );
}
