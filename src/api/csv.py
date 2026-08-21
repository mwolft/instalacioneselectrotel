import aiohttp
import csv
import io

url = "https://docs.google.com/spreadsheets/d/18TCreWyBAcTPjhSPT57d43RAZ2UHDSL5SCSP6gixXVE/edit?usp=sharing"

async def get_csv_data():
    """
    Obtiene datos de múltiples hojas del Google Sheets.
    Por defecto obtiene la primera hoja (gid=0).
    Para agregar más hojas, añade sus gid en la lista.
    """
    # Especifica los gid de las hojas que quieres obtener
    # gid=0 es la primera hoja (por defecto)
    sheets_to_fetch = {
        "Carrousel": "0",
        "Servicios": "1028491717",
        "Casos de éxito": "1093917768"
    }
    
    all_data = {}
    spreadsheet_id = url.split("/d/")[1].split("/")[0]
    
    async with aiohttp.ClientSession() as session:
        for sheet_name, gid in sheets_to_fetch.items():
            csv_url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv&gid={gid}"
            
            try:
                async with session.get(csv_url) as response:
                    if response.status == 200:
                        csv_content = await response.text()
                        csv_reader = csv.DictReader(io.StringIO(csv_content))
                        data = [row for row in csv_reader]
                        all_data[sheet_name] = data
                    else:
                        all_data[sheet_name] = {"error": f"Status {response.status}"}
            except Exception as e:
                all_data[sheet_name] = {"error": str(e)}
    
    return all_data