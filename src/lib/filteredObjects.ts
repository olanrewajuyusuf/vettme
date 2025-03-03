// export function getFilteredObjects(
//   x: Record<string, any> = {},
//   s: Record<string, any> = {},
//   t: Record<string, any> = {},
//   str: string,
//   u: Record<string, any>,
//   str2?: string,
// ): { claim?: any; finding?: any; data?: any; verdict: any }[] {

//   // Step 1: Get key-value pairs based on filtering conditions
//   const resultEntries = Object.entries(x)
//     .filter(([key]) => {
//       if (typeof str2 === "string") {
//         return key.startsWith(str) && key.endsWith(str2);
//       } else {
//         return key.startsWith(str);
//       }
//     })
//     .sort(([keyA], [keyB]) => {
//       const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
//       const aPriority = priorityKeys.includes(keyA) ? -1 : 0;
//       const bPriority = priorityKeys.includes(keyB) ? -1 : 0;
//       return aPriority - bPriority || keyA.localeCompare(keyB);
//     });

//   // Step 2: Extract values from all parameters
//   const resultValues = resultEntries.map(([_, value]) => value);
//   const filteredSValues = resultEntries.map(([key]) => s[key]).filter(val => val !== undefined);
//   const filteredTValues = resultEntries.map(([key]) => t[key]).filter(val => val !== undefined);
//   const filteredUValues = resultEntries.map(([key]) => u[key]).filter(val => val !== undefined);

//   // Step 3: Create array of objects with claim, findings, data, and extra
//   const maxLength = Math.max(resultValues.length, filteredSValues.length, filteredTValues.length, filteredUValues.length);
//   const items = Array.from({ length: maxLength }, (_, i) => ({
//     claim: resultValues[i] ?? null,
//     finding: filteredSValues[i] ?? null,
//     data: filteredTValues[i] ?? null,
//     verdict: filteredUValues[i] ?? false, // Ensure extra is `false` if no valid value
//   }));
  
//   return items;
// }

// //filtering claims and initial data only
// export function getFilteredData(
//   x: Record<string, any> = {},
//   s: Record<string, any> = {},
//   str: string,
//   str2?: string,
// ): { id: string; claim?: any; data?: any }[] {

//   // Step 1: Get key-value pairs based on filtering conditions
//   const resultEntries = Object.entries(x)
//     .filter(([key]) => (typeof str2 === "string" ? key.startsWith(str) && key.endsWith(str2) : key.startsWith(str)))
//     .sort(([keyA], [keyB]) => {
//       const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
//       const aPriority = priorityKeys.includes(keyA) ? -1 : 1;
//       const bPriority = priorityKeys.includes(keyB) ? -1 : 1;
//       return aPriority - bPriority || keyA.localeCompare(keyB);
//     });

//   // Step 2: Convert sorted key-value pairs into an array of objects
//   return resultEntries.map(([key, value]) => ({
//     id: key, // Include key as "id"
//     claim: value ?? null,
//     data: s[key] ?? null,
//   }));
// }

export function getFilteredObjects(
  x: Record<string, any> = {},
  s: Record<string, any> = {},
  t: Record<string, any> = {},
  str: string,
  u: Record<string, any>,
  str2?: string,
): { claim?: any; finding?: any; data?: any; verdict: any }[] {

  // Step 1: Get key-value pairs based on filtering conditions
  const resultEntries = Object.entries(x)
    .filter(([key]) => {
      if (typeof str2 === "string") {
        return key.startsWith(str) && key.endsWith(str2);
      } else {
        return key.startsWith(str);
      }
    })
    .sort(([keyA], [keyB]) => {
      const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
      const aPriority = priorityKeys.includes(keyA) ? -1 : 0;
      const bPriority = priorityKeys.includes(keyB) ? -1 : 0;
      return aPriority - bPriority || keyA.localeCompare(keyB);
    });

  // Step 2: Extract values from all parameters
  const resultValues = resultEntries.map(([_, value]) => value);
  const filteredSValues = resultEntries.map(([key]) => s[key]).filter(val => val !== undefined);
  const filteredTValues = resultEntries.map(([key]) => t[key]).filter(val => val !== undefined);
  const filteredUValues = resultEntries.map(([key]) => u[key]).filter(val => val !== undefined);

  // Step 3: Create array of objects with claim, findings, data, and extra
  const maxLength = Math.max(resultValues.length, filteredSValues.length, filteredTValues.length, filteredUValues.length);
  const items = Array.from({ length: maxLength }, (_, i) => ({
    claim: resultValues[i] ?? null,
    finding: filteredSValues[i] ?? null,
    data: filteredTValues[i] ?? null,
    // verdict: filteredUValues[i] ?? false, // Ensure extra is `false` if no valid value
    verdict: filteredUValues[i] === null ? null : filteredUValues[i] ?? false,

  }));
  
  return items;
}

//filtering claims and initial data only
export function getFilteredData(
  x: Record<string, any> = {},
  s: Record<string, any> = {},
  str: string,
  str2?: string,
): { id: string; claim?: any; data?: any }[] {

  // Step 1: Get key-value pairs based on filtering conditions
  const resultEntries = Object.entries(x)
    .filter(([key]) => (typeof str2 === "string" ? key.startsWith(str) && key.endsWith(str2) : key.startsWith(str)))
    .sort(([keyA], [keyB]) => {
      const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
      const aPriority = priorityKeys.includes(keyA) ? -1 : 1;
      const bPriority = priorityKeys.includes(keyB) ? -1 : 1;
      return aPriority - bPriority || keyA.localeCompare(keyB);
    });

  // Step 2: Convert sorted key-value pairs into an array of objects
  return resultEntries.map(([key, value]) => ({
    id: key, // Include key as "id"
    claim: value ?? null,
    data: s[key] ?? null,
  }));
}

