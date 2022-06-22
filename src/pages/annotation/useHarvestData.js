import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import LRUCache from 'lru-cache';
import {getRealGridData} from './services';
import {addTreeDataOptionsToDemoData} from './services/tree-data-generator';
import {getHarvestColumns} from "./harvestResult.column";
import {getHarvestGridData} from "./services/harvest-data-service";
import {STATIC_HARVEST_RESULT} from "./services/static-harvest-result";

const dataCache = new LRUCache({
    max: 10,
    ttl: 60 * 5 * 1e3 // 5 minutes
});

const deepFreeze = object => {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object); // Freeze properties before freezing self
    // eslint-disable-next-line no-restricted-syntax

    for (const name of propNames) {
        const value = object[name];

        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
};

export const getColumnsFromOptions = options => {
    // let columns = options.dataSet === 'Commodity' ? getCommodityColumns(options.editable) : getEmployeeColumns();
    let columns = getHarvestColumns(options.editable);

    if (options.visibleFields) {
        columns = columns.map(col => {
            let _options$visibleField;

            return (_options$visibleField = options.visibleFields) != null && _options$visibleField.includes(col.field) ? col : _extends({}, col, {
                hide: true
            });
        });
    }

    if (options.maxColumns) {
        columns = columns.slice(0, options.maxColumns);
    }

    return columns;
};

export const getInitialState = (options, columns) => {
    let _options$treeData;

    const columnVisibilityModel = {};
    columns.forEach(col => {
        if (col.hide) {
            columnVisibilityModel[col.field] = false;
        }
    });
    const groupingField = (_options$treeData = options.treeData) == null ? void 0 : _options$treeData.groupingField;

    if (groupingField) {
        columnVisibilityModel[groupingField] = false;
    }

    return {
        columns: {
            columnVisibilityModel
        }
    };
};

export const useHarvestData = options => {
    let _options$treeData5, _options$treeData6, _options$treeData7;

    const tableId = options.tableId ? options.tableId : 0;
    const [rowLength, setRowLength] = React.useState(options.rowLength);
    const [index, setIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const getColumns = React.useCallback(() => {
        return getColumnsFromOptions({
            dataSet: options.dataSet,
            editable: options.editable,
            maxColumns: options.maxColumns,
            visibleFields: options.visibleFields
        });
    }, [options.dataSet, options.editable, options.maxColumns, options.visibleFields]);
    const [data, setData] = React.useState(() => {
        const columns = getColumns();
        return addTreeDataOptionsToDemoData({
            columns,
            rows: [],
            initialState: getInitialState(options, columns)
        }, options.treeData);
    });
    React.useEffect(() => {
        // Cache to allow fast switch between the JavaScript and TypeScript version
        // of the demos.
        const cacheKey = `${options.dataSet}-${rowLength}-${index}-${options.maxColumns}`;

        if (dataCache.has(cacheKey)) {
            const newData = dataCache.get(cacheKey);
            setData(newData);
            setLoading(false);
            return undefined;
        }

        let active = true;

        (async () => {
            let _options$treeData2, _options$treeData3, _options$treeData4;

            setLoading(true);
            let newData;

            // newData = await getRealGridData(rowLength, getColumns());
            newData = await getHarvestGridData(STATIC_HARVEST_RESULT.result.tables[tableId], 0)
// console.log(JSON.stringify(newData))

            if (!active) {
                return;
            }

            newData = addTreeDataOptionsToDemoData(newData, {
                maxDepth: (_options$treeData2 = options.treeData) == null ? void 0 : _options$treeData2.maxDepth,
                groupingField: (_options$treeData3 = options.treeData) == null ? void 0 : _options$treeData3.groupingField,
                averageChildren: (_options$treeData4 = options.treeData) == null ? void 0 : _options$treeData4.averageChildren
            }); // It's quite slow. No need for it in production.

            if (process.env.NODE_ENV !== 'production') {
                deepFreeze(newData);
            }

            dataCache.set(cacheKey, newData);
            setData(newData);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [rowLength, options.dataSet, options.maxColumns, (_options$treeData5 = options.treeData) == null ? void 0 : _options$treeData5.maxDepth, (_options$treeData6 = options.treeData) == null ? void 0 : _options$treeData6.groupingField, (_options$treeData7 = options.treeData) == null ? void 0 : _options$treeData7.averageChildren, index, getColumns]);
    return {
        data,
        loading,
        setRowLength,
        loadNewData: () => {
            setIndex(oldIndex => oldIndex + 1);
        }
    };
};
