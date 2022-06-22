import { randomCity, randomCompanyName, randomCountry, randomCreatedDate, randomEmail, randomId, randomJobTitle, randomPhoneNumber, randomRating, randomUpdatedDate, randomUrl, randomUserName, randomBoolean, randomName, randomColor, randomInt } from './services';
import { renderAvatar, renderCountry, renderEmail, renderLink, renderRating, renderEditRating, renderEditCountry } from './renderer';
import {COUNTRY_ISO_OPTIONS_SORTED} from "./services/static-data";

export const getHarvestColumns = () => [{
    field: 'id',
    generateData: randomId,
    hide: true
}, {
    field: 'avatar',
    headerName: 'Avatar',
    sortable: false,
    generateData: randomColor,
    renderCell: renderAvatar,
    filterable: false,
    disableExport: true
}, {
    field: 'name',
    headerName: 'Name',
    generateData: randomName,
    dataGeneratorUniquenessEnabled: true,
    width: 120,
    editable: true
}, {
    field: 'website',
    headerName: 'Website',
    generateData: randomUrl,
    renderCell: renderLink,
    width: 160,
    editable: true
}, {
    field: 'rating',
    headerName: 'Rating',
    generateData: randomRating,
    renderCell: renderRating,
    renderEditCell: renderEditRating,
    width: 180,
    type: 'number',
    editable: true
}, {
    field: 'email',
    headerName: 'Email',
    generateData: randomEmail,
    renderCell: renderEmail,
    width: 150,
    editable: true
}];
