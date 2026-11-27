# x-reposts-02 v2 — six surviving quote posts

Re-entry for the make.fun bounty "Get the most reposts and likes on
make.fun's newest X posts" ([makefun-x-reposts-02](https://make.fun/bounty/makefun-x-reposts-02),
$500 shared by the top 50).

The v1 entry was disqualified over one flagged post, which has since been
deleted from X. This v2 entry lists only the six posts that survived, each
from the single public account @RAprnty, each quoting a different make.fun
post from @makefunai, with make.fun and the play code
`makefun-candy-barrel-sweater` in its own words.

## How the score works

The house reads every post through FxTwitter's public read at the
deadline and adds up, over all posts in `POSTS.json`:

    score = 2 x reposts + 2 x quotes + 1 x likes

Views and replies move nothing. A deleted or non-public post adds 0.

## The posts

`POSTS.json` at the repository root names the six posts:

- https://x.com/RAprnty/status/2125802090476020154
- https://x.com/RAprnty/status/2125802416725799136
- https://x.com/RAprnty/status/2125802590101475792
- https://x.com/RAprnty/status/2125802735224401963
- https://x.com/RAprnty/status/2125802875431583803
- https://x.com/RAprnty/status/2125802998605738283

## The program

`main.ts` (Node 22, standard library only) copies `POSTS.json` to the
output directory, byte for byte, so the gate can read it. It makes no
network call and prints nothing on success:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POSTS.json` is then byte for byte this directory's `POSTS.json`.
