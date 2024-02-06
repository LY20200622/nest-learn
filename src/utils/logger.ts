/**
 * @description 日志工具
 * @param prefix 日志前缀
 *
 */

const Logger = (prefix?: string) => {
  const p = prefix ?? '';

  return (...content: any[]) => {
    console.log(p ? `【${p}】: ` : '', ...content);
  };
};

export default Logger;
