export const InstagramIcon = ({width = 24, height = 24, color = '#000000', strokeWidth = 2}) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={width} 
            height={height} 
            viewBox="0 0 50 50" 
            fill={color}
            stroke={color}
            strokeWidth={strokeWidth}
        >
        <path d="M16 3c-7.167 0-13 5.833-13 13v18c0 7.168 5.833 13 13 13h18c7.168 0 13-5.832 13-13V16c0-7.167-5.832-13-13-13H16zM16 5h18c6.086 0 11 4.914 11 11v18c0 6.086-4.914 11-11 11H16c-6.086 0-11-4.914-11-11V16c0-6.086 4.914-11 11-11zm21 6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM25 14c-6.063 0-11 4.937-11 11s4.937 11 11 11 11-4.937 11-11-4.937-11-11-11zm0 2c4.982 0 9 4.018 9 9s-4.018 9-9 9-9-4.018-9-9 4.018-9 9-9z"/>
        </svg>
    )
}
