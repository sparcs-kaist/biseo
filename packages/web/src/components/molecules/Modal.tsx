import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { CloseIcon } from "@biseo/web/assets";
import {
  align,
  bg,
  center,
  column,
  gap,
  h,
  justify,
  padding,
  round,
  row,
  text,
  w,
  type Size,
} from "@biseo/web/styles";

interface Props extends PropsWithChildren {
  title: string;
  width?: Size;
  height?: Size;
}

/** backdrop 요소에 사용할 스타일을 정의합니다. */
const backDropStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  ${w("fill")}
  ${h("fill")}
  ${bg.grayTrans}
`;

/** 모달 내 container에 사용할 스타일을 정의합니다. */
const containerStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${gap(15)}
  ${padding.vertical(20)}
  ${padding.horizontal(25)}
  ${column}
  overflow: hidden;
  ${bg.white}
  border: none;
  ${round.lg}
`;

/** 모달의 children을 감쌀 body에 사용할 스타일을 정의합니다. */
const bodyStyle = css`
  overflow: hidden;
`;

/** 모달 닫기 버튼에 사용할 스타일을 정의합니다. */
const closeButtonStyle = css`
  position: relative;
  ${w(22)}
  ${h(22)}
  ${center}
  border: none;
  ${round.xl}
  ${bg.gray100};
  cursor: pointer;
`;

/** 모달 컴포넌트. 새 url에서 표시된다고 가정합니다. */
export const Modal: React.FC<Props> = ({
  title,
  children = null,
  width = "hug",
  height = "hug",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const closeModal = () => navigate("..");
  const onBackdropClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    )
      closeModal();
  };

  useEffect(() => {
    // 첫번째 input 요소가 존재한다면 focus를 줍니다.
    containerRef.current?.querySelector("input")?.focus();

    // 모달 외부 요소의 스크롤을 방지합니다.
    document.body.style.overflow = "hidden";

    // backdrop 클릭 시 모달을 닫는 이벤트 리스너를 추가합니다.
    document.addEventListener("mousedown", onBackdropClick);

    return () => {
      // 모달이 unmount될 때 body의 스크롤을 다시 허용합니다.
      document.body.style.overflow = "auto";

      // document에 추가한 이벤트 리스너를 삭제합니다.
      document.removeEventListener("mousedown", onBackdropClick);
    };
  }, []);

  return (
    <div css={[backDropStyle]}>
      <div css={[containerStyle, w(width), h(height)]} ref={containerRef}>
        <div css={[w("fill"), row, align.center, justify.between]}>
          <p css={[text.title1, text.black]}>{title}</p>
          <Link
            to=".."
            relative="path"
            replace
            style={{ textDecoration: "none" }}
          >
            <button type="button" title="모달 닫기" css={[closeButtonStyle]}>
              <CloseIcon />
            </button>
          </Link>
        </div>
        <div css={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};
