import { DownArrowIcon } from "@biseo/web/assets";
import {
  row,
  center,
  justify,
  align,
  border,
  round,
  bg,
  w,
  h,
  padding,
  gap,
  text,
} from "@biseo/web/styles";

export const AdminAgendaTags: React.FC = () => (
  <div css={[w(270), h(28), gap(16), row, justify.center]}>
    <div css={[row, w(122), h(28), gap(10), align.center]}>
      <p css={[text.body, text.black]}>투표 결과</p>
      <div
        css={[
          border.gray200,
          bg.white,
          w(65),
          h(28),
          center,
          padding.horizontal(15),
          round.md,
          gap(99),
        ]}
      >
        <p css={[text.option1, text.gray600]}>비공개</p>
      </div>
    </div>
    <div css={[row, w(122), h(28), gap(10), align.center]}>
      <p css={[text.body, text.black]}>투표 상세</p>
      <div
        css={[
          border.gray200,
          bg.white,
          w(65),
          h(28),
          center,
          padding.horizontal(15),
          round.md,
          gap(99),
        ]}
      >
        <p css={[text.option1, text.gray600]}>무기명</p>
      </div>
    </div>
  </div>
);

export const AdminAgendaTagsSelect: React.FC = () => (
  <div css={[w(270), h(28), justify.between, row]}>
    <div css={[row, w(130), h(28), gap(8), align.center]}>
      <p css={[text.body, text.black]}>투표 결과</p>
      <div
        css={[
          border.gray200,
          bg.white,
          w(75),
          h(28),
          align.center,
          justify.between,
          padding.horizontal(12),
          padding.vertical(7),
          round.md,
          row,
        ]}
      >
        <p css={[text.option1, text.gray600]}>비공개</p>

        <div css={[padding.vertical(7), center]}>
          <DownArrowIcon />
        </div>
      </div>
    </div>
    <div css={[row, w(130), h(28), gap(8), align.center]}>
      <p css={[text.body, text.black]}>투표 상세</p>
      <div
        css={[
          border.gray200,
          bg.white,
          w(75),
          h(28),
          align.center,
          justify.between,
          padding.horizontal(12),
          padding.vertical(7),
          round.md,
          row,
        ]}
      >
        <p css={[text.option1, text.gray600]}>무기명</p>

        <div css={[padding.vertical(7), center]}>
          <DownArrowIcon />
        </div>
      </div>
    </div>
  </div>
);
