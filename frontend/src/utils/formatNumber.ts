const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
}

export default formatNumber
