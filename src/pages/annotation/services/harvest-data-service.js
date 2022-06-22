import asyncWorker from './asyncWorker';
import Promise from "lodash/_Promise";

export function getHarvestGridData(table, index) {
    return new Promise(resolve => {

        const columns = []
        const rows = []

        for (let j = 0; j < table.numColumns; j += 1) {
            columns.push({
                field: "C" + j,
                headerName: `T${index}C${j}`,
                sortable: false,
                // renderCell: renderAvatar,
                filterable: false,
                disableExport: true,
                editable: true,
                resize: true
            })
        }
        // console.log(JSON.stringify(columns))

        const labelRow = { id: -1 };
        for (let j = 0; j < columns.length; j += 1) {
            labelRow[columns[j].field] = "Label#" + j
        }
        rows.push(labelRow)

        const tasks = {
            current: table.numRows
        };
        function work() {
            const row = {
                id: tasks.current - 1
            };

            for (let j = 0; j < columns.length; j += 1) {
                const column = columns[j];
                row[column.field] = table.rows[tasks.current - 1][j]
            }

            rows.push(row);
            tasks.current -= 1;
        }

        const columnVisibilityModel = {};
        columns.forEach(col => {
            if (col.hide) {
                columnVisibilityModel[col.field] = false;
            }
        });

        asyncWorker({
            work,
            done: () => resolve({
                columns,
                rows,
                initialState: {
                    columns: {
                        columnVisibilityModel
                    }
                }
            }),
            tasks
        });
    });
}
