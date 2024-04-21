// Use Heroicons if suitable icon is available. Add from here: https://heroicons.dev/

// Heroicons/trash
export const DeleteIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    ></path>
  </svg>
);

// Heroicons/plus
export const AddIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

// Heroicons/chat/outline
export const CommentIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    ></path>
  </svg>
);

// Boxicons/coin
export const CoinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12,6C7.03,6,2,7.546,2,10.5v4C2,17.454,7.03,19,12,19s10-1.546,10-4.5v-4C22,7.546,16.97,6,12,6z M4,14.5v-1.197 c0.576,0.335,1.251,0.623,2,0.86v1.881C4.688,15.53,4,14.918,4,14.5z M16,14.648v1.971c-0.867,0.179-1.867,0.31-3,0.358v-2 C14.028,14.935,15.041,14.823,16,14.648z M11,16.978c-1.133-0.048-2.133-0.179-3-0.358v-1.971c0.959,0.174,1.972,0.287,3,0.33 V16.978z M18,16.044v-1.881c0.749-0.237,1.424-0.524,2-0.86V14.5C20,14.918,19.313,15.53,18,16.044z M12,13c-5.177,0-8-1.651-8-2.5 S6.823,8,12,8s8,1.651,8,2.5S17.177,13,12,13z" />
  </svg>
);

// Heroicons/arrow-narrow-right
export const RightArrowIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ArrowUpIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);

// Heroicons/emoji-happy/outline
export const HappyEmojiIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

// Heroicons/heart/outline
export const HeartOutlineIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  </svg>
);

// Heroicons/heart/solid
export const HeartSolidIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// Heroicons/search/outline
export const SearchIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

export const ListIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// Boxicons Hide
export const HideSolidIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8.073 12.194L4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746C9.811 15.88 8.174 14.243 8.073 12.194zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679L22.107 12l-.105-.316C21.98 11.617 19.687 5 12.054 5zM13.96 12.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586C10.602 8.222 11.3 8 12.054 8c2.206 0 4 1.794 4 4 0 .754-.222 1.452-.587 2.053L13.96 12.546z" />
  </svg>
);

// Boxicons Hide
export const HideOutlineIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757C12.568 16.983 12.291 17 12 17c-5.351 0-7.424-3.846-7.926-5 .204-.47.674-1.381 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379-.069.205-.069.428 0 .633C2.073 12.383 4.367 19 12 19zM12 5c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657.069-.205.069-.428 0-.633C21.927 11.617 19.633 5 12 5zM16.972 15.558l-2.28-2.28C14.882 12.888 15 12.459 15 12c0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501C9.796 7.193 10.814 7 12 7c5.351 0 7.424 3.846 7.926 5C19.624 12.692 18.76 14.342 16.972 15.558z" />
  </svg>
);

// Heroicons X
export const CloseIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

// Heroicons solid question-mark-circle
export const QuestionMarkIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

// Heroicons cheveron-down
export const CheveronDownIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

// Heroicons cheveron-up
export const CheveronUpIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

// Heroicons outline cog
export const CogIcon = (props) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

export const LoaderIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z" />
    <path d="M21 11h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2z" />
    <path d="M6 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1z" />
    <path d="M6.22 5a1 1 0 0 0-1.39 1.47l1.44 1.39a1 1 0 0 0 .73.28 1 1 0 0 0 .72-.31 1 1 0 0 0 0-1.41z" />
    <path d="M17 8.14a1 1 0 0 0 .69-.28l1.44-1.39A1 1 0 0 0 17.78 5l-1.44 1.42a1 1 0 0 0 0 1.41 1 1 0 0 0 .66.31z" />
    <path d="M12 18a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z" />
    <path d="M17.73 16.14a1 1 0 0 0-1.39 1.44L17.78 19a1 1 0 0 0 .69.28 1 1 0 0 0 .72-.3 1 1 0 0 0 0-1.42z" />
    <path d="M6.27 16.14l-1.44 1.39a1 1 0 0 0 0 1.42 1 1 0 0 0 .72.3 1 1 0 0 0 .67-.25l1.44-1.39a1 1 0 0 0-1.39-1.44z" />
  </svg>
);

// Heroicons outline pencil
export const EditIcon = (props) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
  </svg>
);

// evaicons outline home
export const HomeIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" {...props}>
    <path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z" />
  </svg>
);

// heroicons dots horizontal
export const DotsHorizontalIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6" {...props}>
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  </svg>
);

// heroicons check outline
export const CheckIcon = (props) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="h-6 w-6"
    {...props}
  >
    <path d="M5 13l4 4L19 7"></path>
  </svg>
);

// heroicons menu-alt4 (Draggable icon)
export const DraggableIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// heroicons tag
export const TagIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6" {...props}>
    <path
      fillRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    ></path>
  </svg>
);

//heroicons flag
export const FlagIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
    />
  </svg>
);

//heroicons chevron-right
export const ChevronArrowRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    ></path>
  </svg>
);

export const ChevronArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-chevron-left"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

export const SelectorIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    ></path>
  </svg>
);

export const SlashIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    // style="color: var(--accents-2);"
    {...props}
  >
    <path d="M16.88 3.549L7.12 20.451"></path>
  </svg>
);

export const ChainIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 511.904 511.904"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <path d="M222.025,417.764c-33.872,35.124-89.034,38.364-126.784,7.445c-22.482-19.465-33.966-48.733-30.72-78.293   c2.811-21.794,12.997-41.97,28.864-57.173l61.355-61.397c12.492-12.496,12.492-32.752,0-45.248l0,0   c-12.496-12.492-32.752-12.492-45.248,0l-60.053,60.075C22.065,269.57,4.802,304.721,0.649,342.521   c-7.757,85.138,54.972,160.445,140.11,168.202c45.721,4.166,90.933-12.179,123.42-44.618l64.171-64.149   c12.492-12.496,12.492-32.752,0-45.248l0,0c-12.496-12.492-32.752-12.492-45.248,0L222.025,417.764z" />
        <path d="M451.358,31.289C387.651-15.517,299.186-8.179,244.062,48.484L183.667,108.9c-12.492,12.496-12.492,32.752,0,45.248l0,0   c12.496,12.492,32.752,12.492,45.248,0l61.355-61.291c33.132-34.267,86.738-38.127,124.437-8.96   c38.803,31.818,44.466,89.067,12.648,127.87c-1.862,2.271-3.833,4.45-5.907,6.53l-64.171,64.171   c-12.492,12.496-12.492,32.752,0,45.248l0,0c12.496,12.492,32.752,12.492,45.248,0l64.171-64.171   c60.413-60.606,60.257-158.711-0.349-219.124C461.638,39.727,456.631,35.341,451.358,31.289z" />
        <path d="M183.667,282.525l99.425-99.425c12.497-12.497,32.758-12.497,45.255,0l0,0c12.497,12.497,12.497,32.758,0,45.255   l-99.425,99.425c-12.497,12.497-32.758,12.497-45.255,0l0,0C171.17,315.283,171.17,295.022,183.667,282.525z" />
      </g>
    </svg>
  );
};

export const CopyIcon = (props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M1163 4625 c-175 -48 -317 -196 -352 -367 -8 -37 -11 -364 -9 -1065
3 -1004 3 -1012 24 -1039 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21
37 26 1046 5 1009 5 1019 26 1046 11 15 33 37 48 48 27 21 38 21 886 26 848 5
859 5 886 26 53 39 69 71 69 134 0 63 -16 95 -69 134 -27 21 -36 21 -889 23
-717 2 -871 -1 -914 -12z"
        />
        <path
          d="M1801 3984 c-169 -45 -301 -180 -346 -351 -23 -87 -22 -2700 0 -2788
45 -172 179 -305 352 -350 86 -22 2060 -22 2146 0 173 45 307 178 352 350 13
52 15 228 15 1395 0 1167 -2 1343 -15 1395 -45 172 -179 305 -352 350 -84 22
-2070 21 -2152 -1z m2125 -330 c15 -11 37 -33 48 -48 21 -27 21 -30 21 -1366
0 -1336 0 -1339 -21 -1366 -11 -15 -33 -37 -48 -48 -27 -21 -33 -21 -1046 -21
-1013 0 -1019 0 -1046 21 -15 11 -37 33 -48 48 -21 27 -21 32 -24 1339 -1 722
0 1326 3 1344 7 40 49 91 90 109 24 11 215 13 1037 11 999 -2 1007 -2 1034
-23z"
        />
      </g>
    </svg>
  );
};

export const VerifiedIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="50px"
      height="50px"
    >
      <path d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562	L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036	c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z" />
    </svg>
  );
};

export const SortIcon = (props) => (
  <svg
    viewBox="0 0 320 512"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301 224.1 288 224.1H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19.1 288 32.1 288H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
  </svg>
);

export const SortUpIcon = (props) => (
  <svg
    viewBox="0 0 320 512"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9S19 224.1 32 224.1h256c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
  </svg>
);

export const SortDownIcon = (props) => (
  <svg
    viewBox="0 0 320 512"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19 287.9 32 287.9h256c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
  </svg>
);

export const Star = ({ height, width, lineColor, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={lineColor}
      stroke={lineColor}
      strokeWidth={4}
      version="1.1"
      viewBox="-5 -5 72 72"
      xmlSpace="preserve"
    >
      <path
        fill={fillColor}
        d="M26.285 2.486l5.407 10.956a2.58 2.58 0 001.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528a2.582 2.582 0 00-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685a2.585 2.585 0 00-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042a2.582 2.582 0 00-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757a2.58 2.58 0 001.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z"
      ></path>
    </svg>
  );
};
