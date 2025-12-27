import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

export default dayjs;
