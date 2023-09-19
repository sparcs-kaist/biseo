import { DownArrowIcon } from "@/assets";

import {
  gap,
  row,
  center,
  justify,
  align,
  text,
  w,
  h,
  bg,
  round,
  padding,
  border,
} from "@/styles";

export const AdminAgendaTags: React.FC = () => (
  <div css={[row, justify.center, gap(16)]}>
    <div css={[row, align.center, gap(10)]}>
      <p css={[text.body, text.black]}>투표 결과</p>
      <div css={[center, bg.white, border.gray200, round.md, w(65), h(28)]}>
        <p css={[text.option1, text.gray600]}>비공개</p>
      </div>
    </div>
    <div css={[row, align.center, gap(10)]}>
      <p css={[text.body, text.black]}>투표 상세</p>
      <div css={[center, bg.white, border.gray200, round.md, w(65), h(28)]}>
        <p css={[text.option1, text.gray600]}>무기명</p>
      </div>
    </div>
  </div>
);

export const AdminAgendaTagsSelect: React.FC = () => (
  <div css={[row, justify.between]}>
    <div css={[row, align.center, gap(8)]}>
      <p css={[text.body, text.black]}>투표 결과</p>
      <div
        css={[
          row,
          justify.between,
          align.center,
          bg.white,
          border.gray200,
          round.md,
          w(75),
          h(28),
          padding.horizontal(12),
        ]}
      >
        <p css={[text.option1, text.gray600]}>비공개</p>
        <DownArrowIcon />
      </div>
    </div>
    <div css={[row, align.center, gap(8)]}>
      <p css={[text.body, text.black]}>투표 상세</p>
      <div
        css={[
          row,
          justify.between,
          align.center,
          bg.white,
          border.gray200,
          round.md,
          w(75),
          h(28),
          padding.horizontal(12),
        ]}
      >
        <p css={[text.option1, text.gray600]}>무기명</p>
        <DownArrowIcon />
      </div>
    </div>
  </div>
);
