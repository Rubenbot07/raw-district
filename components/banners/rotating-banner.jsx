'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const messages = [
  { id: 1, content: <><strong>PAY SECURELY</strong> WITH MERCADO PAGO</> },
  { id: 2, content: <><strong>NEED HELP? </strong></>, link: { href: "https://wa.me/3006870774", text: "Write to us here" } },
  { id: 3, content: <><strong>FREE SHIPPING</strong> FOR PURCHASES OVER $200,000</> },
]

export const RotatingBanner = ({contentMessages, quickLinks}) => {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % (contentMessages?.length || messages.length))
        setIsVisible(true)
      }, 300) 
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  let message;
  
  if(contentMessages) {
    message = contentMessages[index]
  } else {
    message = messages[index]
  }
  

  return (
    <div className={` w-full text-black text-center py-2 text-[10px] xl:text-[12px] transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} `}>
      {message?.link ? (
        <>
          {message?.content}
          |
          <Link href={message?.link?.href} target="_blank" className="underline ml-1 hover:text-gray-300 transition">
            { message?.link?.text}
          </Link>
        </>
      ) : (
         message?.content
      )}
    </div>
  )
}