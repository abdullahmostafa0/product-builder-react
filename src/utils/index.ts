/**
 * 
 * @param {string}txt the input text to slice 
 * @param {number}[max=50] the max length of sliced text   
 * @returns the sliced text with ellipsis (...) if the text exceeds the max length
 */
export function txtSlicer(txt: string, max: number = 50) {
    if (txt.length > max) {
        return `${txt.slice(0, max)}...`
    }
    return txt
}