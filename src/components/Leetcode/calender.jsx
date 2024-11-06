import LeetCodeCalendar from 'leetcode-calendar';

export default function LeetcodeCal() {
    const exampleTheme = {
        light: [
            'rgb(57, 57, 57)', // Base gray
            'rgb(14, 68, 41)', // Light green with low opacity
            'rgb(0, 108, 50)',  // Light green with medium low opacity
            'rgb(38, 166, 65)', // Light green with medium high opacity
            'rgb(57, 211, 83)', // Light green with high opacity
          ],
          dark: [
            'rgb(57, 57, 57)', // Base gray
            'rgb(14, 68, 41)', // Light green with low opacity
            'rgb(0, 108, 50)',  // Light green with medium low opacity
            'rgb(38, 166, 65)', // Light green with medium high opacity
            'rgb(57, 211, 83)', // Light green with high opacity
          ],
          
    };

    return (
        <div className='text-center bg-[#0a0a0a] text-white '>
            <h1 className='text-2xl p-4 hidden lg:block'>Day I <span className='text-blue-700 font-semibold'>LeetCode</span></h1>
            <div className='bg-[#0a0a0a] text-white hidden justify-center text-center lg:flex'>
                <LeetCodeCalendar
                    username='Sangik_Ghosh' // Replace with your LeetCode username
                    blockSize={15} // Default block size
                    blockMargin={5} // Default block margin
                    fontSize={16} // Default font size
                    theme={exampleTheme} // Optional: Custom theme for the calendar
                />
            </div>
        </div>
    );
}
