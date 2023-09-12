import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { CloseIcon } from "@/assets";
import { colors, align, row, justify, text, w, h, type Size } from "@/styles";

export interface Props extends PropsWithChildren {
  title: string;
  width?: Size;
  height?: Size;
}

/** backdrop 요소에 사용할 스타일을 정의합니다. */
export const backDropStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.grayTrans};
`;

/** 모달 내 container에 사용할 스타일을 정의합니다. */
export const containerStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 15px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${bg.white}
  border: none;
  border-radius: 10px;
`;

/** 모달의 children을 감쌀 body에 사용할 스타일을 정의합니다. */
export const bodyStyle = css`
  overflow: hidden;
`;

/** 모달 닫기 버튼에 사용할 스타일을 정의합니다. */
export const closeButtonStyle = css`
  position: relative;
  display: flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 15px;
  background-color: ${colors.gray100};
  cursor: pointer;
`;

export const Modal: React.FC<Props> = ({
  title,
  children = null,
  width = "hug",
  height = "hug",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const closeModal = () => navigate("..");

  useEffect(() => {
    // 첫번째 input 요소가 존재한다면 focus를 줍니다.
    containerRef.current?.querySelector("input")?.focus();

    // 모달 외부 요소의 스크롤을 방지합니다.
    document.body.style.overflow = "hidden";

    // 모달이 unmount될 때 body의 스크롤을 다시 허용합니다.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    /* backdrop 컴포넌트는 키보드 인터렉션을 통해 모달을 닫을 수 있는 <button>을 가지고 있습니다. */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      css={[backDropStyle, w("fill"), h("fill")]}
      onClick={closeModal}
      onKeyUp={closeModal}
    >
      {/* container 컴포넌트의 onClick, onKeyUp 이벤트 리스너는 event propagation을 막기 위해서만 사용됩니다. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        css={[containerStyle, w(width), h(height)]}
        onClick={e => e.stopPropagation()}
        onKeyUp={e => e.stopPropagation()}
        ref={containerRef}
      >
        <div css={[w("fill"), row, align.center, justify.between]}>
          <h1 css={[text.title1, text.black]}>{title}</h1>
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
