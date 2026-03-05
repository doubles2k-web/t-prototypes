/**
 * ═══════════════════════════════════════
 *  TVING Prototype Kit  (tving-kit.js)
 * ═══════════════════════════════════════
 *
 *  사용법 (text/babel 스크립트 안에서):
 *    const { colors, NavBar, InputField, ListGroup, ... } = T;
 *
 *  포함:
 *    토큰 — colors, safeArea, font
 *    아이콘 — ArrowLeft, ArrowRight, ClearIcon, TVINGLogo
 *    컴포넌트 — Screen, NavBar, InputField, DisabledField,
 *              SectionLabel, ListItem, ListGroup,
 *              ActionButton, PrimaryButton, Toast, HomeIndicator
 */
(function () {
  const h = React.createElement;

  /* ─── 디자인 토큰 ─── */
  const colors = {
    tvingRed: "#FF153C", cyan: "#14D8FF", errorRed: "#FF4444",
    gray100: "#0d0d0d", gray200: "#191919", gray600: "#808080",
    white: "#ffffff", black: "#000000",
    white10: "rgba(255,255,255,0.1)", white30: "rgba(255,255,255,0.3)",
  };
  const safeArea = { top: "env(safe-area-inset-top, 0px)", bottom: "env(safe-area-inset-bottom, 0px)" };
  const font = "'Pretendard Variable', Pretendard, -apple-system, sans-serif";

  /* ─── 아이콘 ─── */
  function ArrowLeft() {
    return h("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none" },
      h("path", { d: "M15 19L8 12L15 5", stroke: "white", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function ArrowRight() {
    return h("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
      h("path", { d: "M6 3L11 8L6 13", stroke: colors.gray600, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function ClearIcon(props) {
    var prevent = function (e) { e.preventDefault(); e.stopPropagation(); if (props.onClick) props.onClick(); };
    return h("div", { onMouseDown: prevent, onTouchStart: prevent, style: { cursor: "pointer", display: "flex", flexShrink: 0, padding: 4 } },
      h("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
        h("circle", { cx: 10, cy: 10, r: 7, fill: colors.gray600 }),
        h("path", { d: "M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5", stroke: colors.gray200, strokeWidth: 1.5, strokeLinecap: "round" })));
  }
  function TVINGLogo() {
    return h("svg", { width: 20, height: 20, viewBox: "0 0 20 20" },
      h("rect", { width: 20, height: 20, rx: 4, fill: colors.tvingRed }),
      h("text", { x: 10, y: 14, textAnchor: "middle", fill: "white", fontSize: 10, fontWeight: "bold", fontFamily: "sans-serif" }, "V"));
  }

  /* ─── NavBar ─── props: { title, onBack } */
  function NavBar(props) {
    return h("div", { style: { display: "flex", alignItems: "center", height: 44 } },
      h("div", { onClick: props.onBack, style: { width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } }, h(ArrowLeft)),
      h("span", { style: { fontSize: 17, fontWeight: 700, color: colors.white, fontFamily: font } }, props.title || ""));
  }

  /* ─── SectionLabel ─── props: { label } */
  function SectionLabel(props) {
    return h("p", { style: { fontSize: 17, fontWeight: 700, color: colors.white, fontFamily: font } }, props.label);
  }

  /* ─── InputField ─── props: { value, placeholder, disabled, readOnly, focused, error, inputRef, inputType, inputMode, onChange, onFocus, onBlur, onClear, showClear, timer, caption, captionColor } */
  function InputField(props) {
    var borderColor = props.error ? colors.errorRed : props.focused ? colors.white : "transparent";
    var bg = props.disabled ? colors.gray100 : colors.gray200;
    var border = props.disabled ? colors.gray200 : borderColor;
    var inner;
    if (props.disabled) {
      inner = h("span", { style: { flex: 1, fontSize: 16, color: colors.gray600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } }, props.value || props.placeholder);
    } else {
      inner = h("input", {
        ref: props.inputRef, type: props.inputType || "text",
        inputMode: props.readOnly ? "none" : props.inputMode,
        value: props.value, placeholder: props.placeholder,
        readOnly: props.readOnly,
        onChange: props.readOnly ? undefined : props.onChange,
        onFocus: props.readOnly ? function (e) { e.target.blur(); } : props.onFocus,
        onBlur: props.onBlur,
        autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false",
        style: { flex: 1, fontSize: 16, height: "100%", background: "transparent", border: "none", outline: "none", color: colors.white, caretColor: colors.white, fontFamily: font, padding: 0, margin: 0, WebkitAppearance: "none", pointerEvents: props.readOnly ? "none" : "auto" }
      });
    }
    return h("div", { style: { width: "100%" }, "data-field": "true" },
      h("div", { style: { display: "flex", gap: 8, alignItems: "center", height: 52, padding: "0 16px", background: bg, borderRadius: 12, border: "2px solid " + border, transition: "border-color 0.2s ease" } },
        inner,
        (props.showClear && props.focused && props.value) ? h(ClearIcon, { onClick: props.onClear }) : null,
        props.timer ? h("span", { style: { color: colors.cyan, fontSize: 16, flexShrink: 0 } }, props.timer) : null),
      props.caption ? h("p", { style: { fontSize: 13, color: props.captionColor || colors.cyan, marginTop: 8 } }, props.caption) : null);
  }

  /* ─── DisabledField ─── props: { value, leftIcon } */
  function DisabledField(props) {
    return h("div", { style: { display: "flex", gap: 8, alignItems: "center", height: 52, padding: "0 16px", background: colors.gray100, borderRadius: 12, border: "2px solid " + colors.gray200 } },
      props.leftIcon || null,
      h("span", { style: { fontSize: 16, color: colors.gray600 } }, props.value));
  }

  /* ─── ListItem ─── props: { label, onClick } */
  function ListItem(props) {
    return h("div", { onClick: props.onClick, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", cursor: "pointer" } },
      h("span", { style: { fontSize: 16, color: colors.white, lineHeight: 1.5 } }, props.label),
      h(ArrowRight));
  }

  /* ─── ListGroup ─── props: { title, children } */
  function ListGroup(props) {
    return h("div", { style: { padding: "12px 16px", width: "100%" } },
      h("p", { style: { fontSize: 17, fontWeight: 700, color: colors.white, marginBottom: 12 } }, props.title),
      h("div", { style: { background: colors.white10, borderRadius: 16, padding: 4, overflow: "hidden" } }, props.children));
  }

  /* ─── ActionButton ─── props: { label, onClick, disabled, width } */
  function ActionButton(props) {
    var prevent = function (e) { e.preventDefault(); };
    return h("button", { onMouseDown: prevent, onTouchStart: prevent, onClick: props.onClick,
      style: { width: props.width || 132, height: 52, background: "transparent", border: "1px solid " + colors.gray600, borderRadius: 12, color: colors.white, fontSize: 16, cursor: props.disabled ? "default" : "pointer", opacity: props.disabled ? 0.4 : 1, whiteSpace: "nowrap", flexShrink: 0, fontFamily: font }
    }, props.label);
  }

  /* ─── PrimaryButton ─── props: { label, enabled, onClick } */
  function PrimaryButton(props) {
    var on = props.enabled !== false;
    return h("div", { style: { padding: "12px 16px" } },
      h("button", { onClick: props.onClick,
        style: { width: "100%", height: 52, background: on ? colors.white : "#1C1C22", borderRadius: 100, border: "none", fontSize: 16, fontWeight: 700, color: on ? colors.black : colors.white30, cursor: on ? "pointer" : "default", fontFamily: font }
      }, props.label || "완료"));
  }

  /* ─── Toast ─── props: { message } */
  function Toast(props) {
    if (!props.message) return null;
    return h("div", { style: { position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", padding: "12px 24px", borderRadius: 100, color: colors.white, fontSize: 14, whiteSpace: "nowrap", animation: "toastIn 0.3s ease", zIndex: 200 } }, props.message);
  }

  /* ─── HomeIndicator ─── */
  function HomeIndicator() {
    return h("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "calc(34px + " + safeArea.bottom + ")", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 8, zIndex: 110, pointerEvents: "none" } },
      h("div", { style: { width: 144, height: 5, background: colors.white, borderRadius: 100, opacity: 0.3 } }));
  }

  /* ─── Screen (전체 화면 래퍼) ─── props: { title, onBack, toast, scrollRef, children } */
  function Screen(props) {
    return h("div", { style: { width: "100%", height: "100%", background: colors.black, position: "relative", overflow: "hidden", maxWidth: 430, margin: "0 auto" } },
      h("div", { style: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 50, background: colors.black, paddingTop: safeArea.top } },
        h(NavBar, { title: props.title, onBack: props.onBack })),
      h("div", { ref: props.scrollRef, style: { position: "absolute", top: "calc(44px + " + safeArea.top + ")", left: 0, right: 0, bottom: "calc(" + safeArea.bottom + ")", overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" } },
        props.children),
      h(HomeIndicator),
      h(Toast, { message: props.toast }));
  }

  /* ─── window.T 로 내보내기 ─── */
  window.T = {
    colors: colors, safeArea: safeArea, font: font,
    ArrowLeft: ArrowLeft, ArrowRight: ArrowRight, ClearIcon: ClearIcon, TVINGLogo: TVINGLogo,
    NavBar: NavBar, SectionLabel: SectionLabel, InputField: InputField, DisabledField: DisabledField,
    ListItem: ListItem, ListGroup: ListGroup, ActionButton: ActionButton, PrimaryButton: PrimaryButton,
    Toast: Toast, HomeIndicator: HomeIndicator, Screen: Screen,
  };
})();
